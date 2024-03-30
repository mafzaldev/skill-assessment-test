"use client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useTodoStore } from "@/providers/todo-state-provider";

export function DeleteButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const { deleteTodo } = useTodoStore((state) => state);

  const handleClick = () => {
    deleteTodo(id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-[48%] rounded-md bg-red-200 px-2 py-1 text-sm text-red-500">
          Delete Todo
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Todo</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete this todo? This action cannot be
          undone.
        </p>
        <button
          className="rounded-md bg-red-200 px-8 py-2 text-sm text-red-500"
          onClick={handleClick}
        >
          Delete
        </button>
      </DialogContent>
    </Dialog>
  );
}
