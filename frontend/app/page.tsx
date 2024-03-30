"use client";
import ChevronIcon from "@/components/icons/ChevronIcon";
import ListIcon from "@/components/icons/ListIcon";
import CreateForm from "@/components/ui/create-form";
import TodoItem from "@/components/ui/todo-item";
import { useTodoStore } from "@/providers/todo-state-provider";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const { todos, fetchTodos } = useTodoStore((state) => state);

  // const onSubmit = async (title: string) => {
  //   const createdAt = new Date().toISOString();

  //   const response = await fetch("http://localhost:5000/api/todo", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       title,
  //       createdAt,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const result = await response.json();
  //   setTodoList((prev) => [...prev, result.todo]);
  // };

  const updateTodoStatus = async (id: string, isCompleted: boolean) => {
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
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo,
      ),
    );
  };

  const updateTodoTitle = async (id: string, title: string) => {
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
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, title: title } : todo,
      ),
    );
  };

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/todos", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const result = await response.json();
  //       console.log(result.todos);
  //       setTodoList(result.todos);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchTodos();
  // }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-16">
      <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md md:h-28 md:w-28">
        <Image
          src="/profile.jpg"
          alt="Profile Picture"
          width={200}
          height={200}
        />
      </div>
      <CreateForm />
      <div className="flex w-[285px] items-center justify-between rounded-md border-2 border-white bg-white/20 p-2 shadow-md backdrop-blur-sm">
        <div className="flex items-center">
          <ListIcon className="h-5 w-5" />
          <span className="ml-1 font-medium text-gray-500">Your Todos</span>
        </div>
        <ChevronIcon className="h-5 w-5" />
      </div>
      {todos?.length === 0 ? (
        <div className="mt-2 flex h-[150px] w-[285px] items-center justify-center rounded-md bg-white/50 p-2 shadow-md backdrop-blur-sm">
          No Task Today
        </div>
      ) : (
        <div className="mt-2 flex flex-col p-2">
          {todos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
            // <div
            //   key={todo.id}
            //   className="border-b-1 flex w-[285px] items-center justify-between border-gray-400 bg-[#DDD5CC]/80 px-2 py-3 shadow-md first:rounded-t-md first:border-t-0 last:rounded-b-md last:border-b-0"
            // >
            //   <div className="flex items-center">
            //     <CheckCircleIcon
            //       onClick={() => updateTodo(todo.id, todo.isCompleted)}
            //       className={cn(
            //         `h-5 w-5 cursor-pointer`,
            //         todo.isCompleted ? "fill-green-500" : "fill-gray-600",
            //       )}
            //     />
            //     <span className="ml-1 font-medium text-gray-600">
            //       {todo.title}
            //     </span>
            //   </div>
            //   <DotIcon className="h-5 w-5 cursor-pointer" />
            // </div>
          ))}
          {/* <TodoItem /> */}
          {/* <EditButton id={todo.id} title={todo.title} /> */}
        </div>
      )}
    </main>
  );
}
