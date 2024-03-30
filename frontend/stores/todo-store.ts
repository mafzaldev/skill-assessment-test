import { createStore } from 'zustand/vanilla';


export type TodoState = {
    isLoading: boolean
    todos: Todo[]
}

export type TodoActions = {
    fetchTodos: () => void
    createTodo: (title: string) => void
    updateTodoTitle: (id: string, title: string) => void
    updateTodoStatus: (id: string, isCompleted: boolean) => void
    deleteTodo: (id: string) => void
}

export const defaultInitState: TodoState = {
    isLoading: false,
    todos: [],
}

export const initTodoStore = (): TodoState => {

    return {
        isLoading: false,
        todos: [],
    }
}

export const createTodoStore = (
    initState: TodoState = defaultInitState,
) => {
    return createStore<TodoStore>()((set) => ({
        ...initState,
        fetchTodos: async () => {
            set({ isLoading: true });
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todos`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();
                console.log(result.todos);
                set({
                    todos: result.todos
                });
            } catch (error) {
                console.error(error);
            } finally {
                set({ isLoading: false });
            }
        },

        createTodo: async (title: string) => {
            const createdAt = new Date().toISOString();
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todo`, {
                    method: "POST",
                    body: JSON.stringify({
                        title,
                        createdAt,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();
                set((state) => ({ todos: [result.todo, ...state.todos] }));
            } catch (error) {
                console.error(error);
            }
        },
        updateTodoTitle: async (id: string, title: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todo`, {
                method: "PATCH",
                body: JSON.stringify({
                    id,
                    title,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) return;
            set((state) => ({
                todos: state.todos.map((todo) =>
                    todo.id === id ? { ...todo, title: title } : todo,
                ),
            }));
        },
        updateTodoStatus: async (id: string, isCompleted: boolean) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todo`, {
                method: "PATCH",
                body: JSON.stringify({
                    id,
                    isCompleted: !isCompleted,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) return;

            set((state) => ({
                todos: state.todos.map((todo) =>
                    todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo,
                ),
            }));

        },
        deleteTodo: async (id: string) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/todo/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) return;
            set((state) => ({
                todos: state.todos.filter((todo) => todo.id !== id),
            }));
        }
    }))
}

export type TodoStore = TodoState & TodoActions
