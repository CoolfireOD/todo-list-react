import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useProgressBar } from "../../../components/ProgressBarProvider";
import { LISTS_QUERY_KEY } from "../../../const";
import { TodoList } from "../../../types";
import * as API from "../api";

export const usePostListMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const queryKey = LISTS_QUERY_KEY;
  const navigate = useNavigate();

  const { start, finish } = useProgressBar();

  return useMutation(API.postList, {
    onMutate: start,
    onSuccess: (newList) => {
      onSuccess?.();
      queryClient.setQueryData(
        ["items", { listId: newList.id }],
        () => newList.items
      );
      queryClient.setQueryData<TodoList[]>(queryKey, (previousData = []) => [
        ...previousData,
        newList,
      ]);
      navigate(`/lists/${newList.id}`);
    },
    onSettled: finish,
  });
};
