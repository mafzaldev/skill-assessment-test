import ChevronIcon from "@/components/icons/ChevronIcon";
import ListIcon from "@/components/icons/ListIcon";
import CreateForm from "@/components/ui/create-form";
import TodoList from "@/components/ui/todo-list";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-16">
      <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md md:h-28 md:w-28">
        <Image
          src="/profile.jpg"
          alt="Profile Picture"
          width={200}
          height={200}
          priority
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
      <TodoList />
    </main>
  );
}
