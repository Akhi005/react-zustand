export interface Todo {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}
export interface FormData {
  title: string;
  description: string;
  date: string;
};
export interface TodoSummary {
  total: number;
  completed: number;
  notCompleted: number;
}
export interface TodoInput {
  title: string;
  description: string;
  date: string;
  completed: boolean;
}
export interface PaginatedTodos {
  data: Todo[];
  total: number;
  limit: number;
  offset: number;
}
