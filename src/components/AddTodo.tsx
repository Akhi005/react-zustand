import React, { useState } from "react";
import { useAddTodo } from "../api/todos";
import type { FormData } from "../types/todo";

export default function AddTodo() {
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    date: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { mutateAsync, isPending } = useAddTodo();

  const validate = (form: FormData) => {
    const e: Partial<FormData> = {};
    if (!form.title) e.title = "Title is required";
    if (!form.description) e.description = "Description is required";
    if (!form.date) e.date = "Date is required";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      await mutateAsync({ ...form, completed: false });
      setForm({ title: "", description: "", date: "" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border rounded p-2"
      />
      {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border rounded p-2"
      />
      {errors.description && (
        <p className="text-red-600 text-sm">{errors.description}</p>
      )}

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="border rounded p-2"
      />
      {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white rounded p-2 disabled:opacity-60"
      >
        {isPending ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
}
