export type TodoItem = {
  id: string;
  description: string;
  completed: boolean;
  listId: string;
};

export type TodoList = {
  id: string;
  name: string;
  items: TodoItem[];
};
