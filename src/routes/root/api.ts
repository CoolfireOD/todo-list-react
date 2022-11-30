import { get, post, remove } from "../../utils/requests";
import { API_DOMAIN } from "../../const";
import { TodoList } from "../../types";

const url = API_DOMAIN + "/lists";
type ResponseData = Array<Omit<TodoList, "items">>;

export const getLists = async () => {
  const { data } = await get<ResponseData>(url);

  return data;
};

export const postList = async (list: Pick<TodoList, "name">) => {
  const { data } = await post<TodoList>(url, list);

  return data;
};

export const deleteList = async (listId: string) => {
  await remove(`${url}/${listId}`);
};
