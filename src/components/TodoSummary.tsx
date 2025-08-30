import React from "react";
import { useTodoSummary } from "../api/todos";
import { useTodoStore } from "../store/useTodoStore";
import { CheckCircle, ListTodo, XCircle } from "lucide-react";

export const TodoSummary: React.FC = () => {
  const { search } = useTodoStore();
  const { data, isLoading } = useTodoSummary(search);

  if (isLoading) {
    return (
      <div className="p-4 rounded-xl bg-gray-100 text-center shadow-sm ">
        Loading summary...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Total */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 shadow hover:shadow-md transition">
        <div className="p-2 bg-blue-100 rounded-full">
          <ListTodo className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-semibold">{data?.total ?? 0}</p>
        </div>
      </div>

      {/* Completed */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 shadow hover:shadow-md transition">
        <div className="p-2 bg-green-100 rounded-full">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Completed</p>
          <p className="text-lg font-semibold">{data?.completed ?? 0}</p>
        </div>
      </div>

      {/* Not Completed */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 shadow hover:shadow-md transition">
        <div className="p-2 bg-red-100 rounded-full">
          <XCircle className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Not Completed</p>
          <p className="text-lg font-semibold">{data?.notCompleted ?? 0}</p>
        </div>
      </div>
    </div>
  );
};
