import { create } from "zustand";
import type { Todo } from "../types/todo";

interface TodoStore {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;

  search: string;
  setSearch: (value: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),

  search: "",
  setSearch: (value) => set({ search: value }),
}));
