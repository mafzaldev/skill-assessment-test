"use client";

import { useTodoStore } from "@/providers/todo-state-provider";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import TodoItem from "./todo-item";

export default function TodoList() {
  const { todos, isLoading, fetchTodos } = useTodoStore((state) => state);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      {todos?.length === 0 ? (
        <div className="mt-2 flex h-[150px] w-[285px] items-center justify-center rounded-md bg-white/50 p-2 shadow-md backdrop-blur-sm">
          {!isLoading ? (
            <p>No Task Today</p>
          ) : (
            <LoaderCircle className="h-10 w-10 animate-spin" />
          )}
        </div>
      ) : (
        <div className="mt-2 flex flex-col p-2">
          {todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </div>
      )}
    </>
  );
}
