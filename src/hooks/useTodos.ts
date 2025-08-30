import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Todo } from "../types/todo";

const fetchTodos = async (): Promise<Todo[]> => {
  const res = await axios.get("http://localhost:3000/tasks");
  return res.data;
};

export function useTodos() {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      axios.delete(`http://localhost:3000/tasks/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}

export function useCompleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      axios.patch(`http://localhost:3000/tasks/${id}`, { completed: true }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}
