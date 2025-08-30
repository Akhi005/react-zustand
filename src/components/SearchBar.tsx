import React from "react";
import { useTodoStore } from "../store/useTodoStore";

export const SearchBar: React.FC = () => {
  const { search, setSearch } = useTodoStore();
  return (
    <input
      aria-label="Search tasks"
      placeholder="Search by title..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded p-2 w-full mb-4"
    />
  );
};
