import React, { FC } from "react";
import { TodoListsLayout } from "./TodoListsLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as API from "../api";
import { getListQueryKey } from "../../../utils/getListQueryKey";
import { ToDoListsItem } from "./TodoListsItem";
import { LISTS_QUERY_KEY } from "../const";

export const TodoLists: FC = () => {
  const queryClient = useQueryClient();

  const { data: listItems } = useQuery(LISTS_QUERY_KEY, API.getLists, {
    suspense: true,
    onSuccess: (todoLists) => {
      todoLists.forEach((item) => {
        const queryKey = getListQueryKey(item.id);

        queryClient.setQueryData(queryKey, () => item);
      });
    },
  });

  return (
    <TodoListsLayout>
      {listItems?.map((list) => (
        <ToDoListsItem key={list.id} id={list.id} description={list.name} />
      ))}
    </TodoListsLayout>
  );
};
