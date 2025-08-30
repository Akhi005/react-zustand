import React, { useEffect, useState } from "react";
import type { Todo } from "../types/Todo";
import { useUpdateTodo } from "../api/todos";

interface Props {
  todo: Todo;
  onClose: () => void;
}

export const UpdateTodoForm: React.FC<Props> = ({ todo, onClose }) => {
  const { mutateAsync, isLoading } = useUpdateTodo();
  const [form, setForm] = useState({
    title: todo.title,
    description: todo.description,
    date: todo.date,
  });

  useEffect(() => {
    setForm({
      title: todo.title,
      description: todo.description,
      date: todo.date,
    });
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync({ id: todo.id, ...form, completed: todo.completed });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border rounded p-2"
      />
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border rounded p-2"
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="border rounded p-2"
      />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onClose} className="p-2 rounded border">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="p-2 rounded bg-emerald-600 text-white"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};
