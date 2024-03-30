"use client";

import PlusIcon from "@/components/icons/PlusIcon";
import { useTodoStore } from "@/providers/todo-state-provider";
import { FormEvent, useState } from "react";

export default function CreateForm() {
  const [task, setTask] = useState("");
  const { createTodo } = useTodoStore((state) => state);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!task) return;
    createTodo(task);
    setTask("");
  };

  return (
    <form className="my-6 flex items-center gap-1 rounded-md bg-white stroke-none px-2 py-1">
      <input
        type="text"
        className="p-2 tracking-tighter"
        placeholder="Add new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleSubmit}>
        <PlusIcon className="h-8 w-8 rounded-md bg-[#BBB18C] p-1" />
      </button>
    </form>
  );
}
