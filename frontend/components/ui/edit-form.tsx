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
        <button>Edit Profile</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
        </DialogHeader>
        <form className="my-6 flex items-center gap-1 rounded-md bg-white stroke-none px-2 py-1">
          <input
            type="text"
            className="p-2 tracking-tighter"
            placeholder="Add new task"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleSubmit}>Update</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
