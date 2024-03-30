import { createStore } from 'zustand/vanilla';


export type TodoState = {
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
    todos: [],
}

export const initTodoStore = (): TodoState => {
    return { todos: [] }
}

export const createTodoStore = (
    initState: TodoState = defaultInitState,
) => {
    return createStore<TodoStore>()((set) => ({
        ...initState,
        fetchTodos: async () => {
            try {
                const response = await fetch("http://localhost:5000/api/todos", {
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
            }
        },

        createTodo: async (title: string) => {
            const createdAt = new Date().toISOString();
            try {
                const response = await fetch("http://localhost:5000/api/todo", {
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
                set((state) => ({ todos: [...state.todos, result.todo] }));
            } catch (error) {
                console.error(error);
            }
        },
        updateTodoTitle: async (id: string, title: string) => {
            const response = await fetch("http://localhost:5000/api/todo", {
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
            const response = await fetch("http://localhost:5000/api/todo", {
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
        deleteTodo: async (id: string) => { }
    }))
}

export type TodoStore = TodoState & TodoActions
