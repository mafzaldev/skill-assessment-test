"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore, type StoreApi } from "zustand";

import {
  createTodoStore,
  initTodoStore,
  type TodoStore,
} from "@/stores/todo-store";

export const TodoStoreContext = createContext<StoreApi<TodoStore> | null>(null);

export interface TodoStoreProviderProps {
  children: ReactNode;
}

export const TodoStoreProvider = ({ children }: TodoStoreProviderProps) => {
  const storeRef = useRef<StoreApi<TodoStore>>();
  if (!storeRef.current) {
    storeRef.current = createTodoStore(initTodoStore());
  }

  return (
    <TodoStoreContext.Provider value={storeRef.current}>
      {children}
    </TodoStoreContext.Provider>
  );
};

export const useTodoStore = <T,>(selector: (store: TodoStore) => T): T => {
  const todoStoreContext = useContext(TodoStoreContext);

  if (!todoStoreContext) {
    throw new Error(`useTodoStore must be use within TodoStoreContext`);
  }

  return useStore(todoStoreContext, selector);
};
