"use client";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import DotIcon from "@/components/icons/DotIcon";
import { cn, formatDate } from "@/lib/utils";
import { useTodoStore } from "@/providers/todo-state-provider";
import { useState } from "react";
import { DeleteButton } from "./delete-button";
import { EditButton } from "./edit-button";

function TodoItem({ todo }: { todo: Todo }) {
  const [open, setOpen] = useState(false);
  const { updateTodoStatus } = useTodoStore((state) => state);

  return (
    <div
      key={todo.id}
      className="border-b-1 flex w-[285px] items-center justify-between border-gray-400 bg-[#DDD5CC]/80 px-2 py-3 shadow-md first:rounded-t-md first:border-t-0 last:rounded-b-md last:border-b-0"
    >
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircleIcon
              onClick={() => updateTodoStatus(todo.id, todo.isCompleted)}
              className={cn(
                `h-5 w-5 cursor-pointer`,
                todo.isCompleted ? "fill-green-500" : "fill-gray-600",
              )}
            />
            <span className="ml-1 font-medium text-gray-600">{todo.title}</span>
          </div>
          <DotIcon
            className="h-5 w-5 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div
          className={cn(
            "my-1 h-0 overflow-hidden transition-[height] duration-300 ease-in-out",
            {
              "h-[100px]": open,
            },
          )}
        >
          <p className="py-2 text-sm font-medium">
            Is Completed:{" "}
            <span className="font-normal">
              {todo.isCompleted ? "Completed " : "Pending"}
            </span>
          </p>
          <p className="text-sm font-medium">
            Created At:{" "}
            <span className="font-normal">{formatDate(todo.createdAt)}</span>
          </p>
          <div className="my-2 w-full space-x-1">
            <EditButton id={todo.id} title={todo.title} />
            <DeleteButton id={todo.id} />
          </div>
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. [...] */}
        </div>
      </div>

      {/* <EditButton id={todo.id} title={todo.title} /> */}
    </div>
  );
}

export default TodoItem;
