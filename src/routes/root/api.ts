import { get } from "../../utils/requests";
import { API_DOMAIN } from "../../const";
import { TodoList } from "../../types";

const url = API_DOMAIN + "/lists";
type ResponseData = Array<Omit<TodoList, "items">>;

export const getLists = async () => {
  const { data } = await get<ResponseData>(url);

  return data;
};
