import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./client";
import type { PaginatedTodos, Todo, TodoInput, TodoSummary } from "../types/todo";

export const useTodos = (params: {
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: "title" | "date";
  direction?: "ASC" | "DESC";
}) =>
  useQuery<PaginatedTodos>({
    queryKey: ["todos", params],
    queryFn: async () => {
      const { data } = await api.get<PaginatedTodos>("/tasks", { params });
      return data; 
    },
  });

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: TodoInput) => api.post("/tasks", todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...todo }: Todo & Partial<TodoInput>) =>
      api.put(`/tasks?id=${id}`, todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/tasks?id=${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useCompleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.patch(`/tasks/${id}/complete`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
  });
};

export const useTodoSummary = (search: any) =>
  useQuery<TodoSummary>({
    queryKey: ["summary"],
    queryFn: async () => {
      const { data } = await api.get<TodoSummary>("/tasks/summary");
      return data; 
    },
  });
