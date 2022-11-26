import React, { FC } from "react";
import Link from "@mui/material/Link";
import { TodoListsLayout } from "./TodoListsLayout";
import { TodoListsItemWrapper } from "./TodoListsItemWrapper";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import * as API from "../api";
import { getListQueryKey } from "../../../utils/getListQueryKey";

export const TodoLists: FC = () => {
  const queryClient = useQueryClient();

  const { data: listItems } = useQuery(["lists"], API.getLists, {
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
        <TodoListsItemWrapper key={list.id}>
          <Link href={`/lists/${list.id}`}>{list.name}</Link>
        </TodoListsItemWrapper>
      ))}
    </TodoListsLayout>
  );
};
