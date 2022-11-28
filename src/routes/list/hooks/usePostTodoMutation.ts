import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as API from "../api";
import { TodoItem } from "../../../types";
import { useIdParam } from "../../../hooks/useIdParam";
import { getTodosQueryKey } from "../utils";
import { useProgressBar } from "../../../components/ProgressBarProvider";

export const usePostTodoMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const listId = useIdParam();
  const queryKey = getTodosQueryKey({ listId });

  const { start, finish } = useProgressBar();

  return useMutation(API.postTodo, {
    onMutate: start,
    onSuccess: (newTodo) => {
      onSuccess?.();
      queryClient.setQueryData<TodoItem[]>(queryKey, (previousData = []) => [
        ...previousData,
        newTodo,
      ]);
    },
    onSettled: finish,
  });
};
