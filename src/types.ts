export type TodoItem = {
  id: number;
  description: string;
  completed: boolean;
  listId: string;
};

export type TodoList = {
  id: string;
  name: string;
  items: TodoItem[];
};
