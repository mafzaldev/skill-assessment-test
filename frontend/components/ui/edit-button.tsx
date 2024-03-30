"use client";
import { FormEvent, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useTodoStore } from "@/providers/todo-state-provider";

export function EditButton({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { updateTodoTitle } = useTodoStore((state) => state);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateTodoTitle(id, newTitle);
    setOpen(false);
    setNewTitle("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-[48%] rounded-md bg-green-100 px-2 py-1 text-sm text-green-600">
          Update Todo
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
        </DialogHeader>
        <form className="my-6 flex flex-col  items-center gap-2 rounded-md stroke-none px-2 py-1">
          <input
            type="text"
            className="rounded-md p-2 tracking-tighter"
            placeholder="Add new task"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button
            className="rounded-md bg-red-200 px-8 py-2 text-sm text-red-500"
            onClick={handleSubmit}
          >
            Update
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
