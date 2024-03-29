"use client";

import PlusIcon from "@/components/icons/PlusIcon";
import { FormEvent, useState } from "react";

export default function CreateForm({
  onSubmit,
}: {
  onSubmit: (title: string) => void;
}) {
  const [task, setTask] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    setTask("");
  };

  return (
    <form className="my-6 flex items-center gap-1 rounded-md bg-white stroke-none px-2 py-1">
      <input
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
