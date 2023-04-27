import { get, post, put, remove } from "../../utils/requests";
import { API_DOMAIN } from "../../const";
import { TodoItem, TodoList } from "../../types";

const listsUrl = API_DOMAIN + "/lists";
const itemsUrl = API_DOMAIN + "/items";

export const getList = async (listId: string) => {
  const { data } = await get<TodoList>(`${listsUrl}/${listId}`);

  return data;
};

export const getTodos = async (listId: string) => {
  const { data } = await get<TodoItem[]>(`${itemsUrl}/?listId=${listId}`);

  return data;
};

export const postTodo = async (item: Omit<TodoItem, "id">) => {
  const { data } = await post<TodoItem>(itemsUrl, item);

  return data;
};

export const updateTodo = async (item: TodoItem) => {
  const { data } = await put<TodoItem>(`${itemsUrl}/${item.id}`, item);

  return data;
};

export const deleteTodo = async (itemId: string) => {
  await remove(`${itemsUrl}/${itemId}`);
};

export const reorderTodos = async (reorderData: {
  itemIds: string[];
  listId: string;
}) => {
  const { data } = await put<TodoItem[]>(itemsUrl + "/reorder", reorderData);

  return data;
};
