import React from "react";
import { useTodos, useDeleteTodo, useCompleteTodo } from "../hooks/useTodos";
import type { Todo } from "~/src/types/todo";

export default function TodoList() {
  const { data: todos, isLoading } = useTodos();
  const deleteMutation = useDeleteTodo();
  const completeMutation = useCompleteTodo();

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul>
      {todos?.map((todo: Todo) => (
        <li key={todo.id} className="flex justify-between items-center mb-2">
          <span>
            {todo.title} {todo.completed}
          </span>
          <div>
            {!todo.completed && (
              <button
                onClick={() => completeMutation.mutate(todo.id)}
                className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
              >
                Complete
              </button>
            )}
            <button
              onClick={() => deleteMutation.mutate(todo.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
