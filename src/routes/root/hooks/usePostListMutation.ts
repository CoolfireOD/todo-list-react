import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useProgressBar } from "../../../components/ProgressBarProvider";
import { LISTS_QUERY_KEY } from "../../../const";
import { TodoList } from "../../../types";
import * as API from "../api";
import { getTodosQueryKey } from "../../list/utils";

export const usePostListMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const listQueryKey = LISTS_QUERY_KEY;
  const navigate = useNavigate();
  const { start, finish } = useProgressBar();

  return useMutation(API.postList, {
    onMutate: start,
    onSuccess: (newList) => {
      onSuccess?.();
      const itemsQueryKey = getTodosQueryKey({ listId: newList.id });
      queryClient.setQueryData(itemsQueryKey, () => newList.items);
      queryClient.setQueryData<TodoList[]>(
        listQueryKey,
        (previousData = []) => [...previousData, newList]
      );
      navigate(`/lists/${newList.id}`);
    },
    onSettled: finish,
  });
};
