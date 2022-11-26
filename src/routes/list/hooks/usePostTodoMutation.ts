import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as API from "../api";
import { TodoItem } from "../../../types";
import { useIdParam } from "../../../hooks/useIdParam";
import { getTodosQueryKey } from "../utils";

export const usePostTodoMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const listId = useIdParam();
  const queryKey = getTodosQueryKey({ listId });

  return useMutation(API.postTodo, {
    onSuccess: (newTodo) => {
      onSuccess?.();
      queryClient.setQueryData<TodoItem[]>(queryKey, (previousData = []) => [
        ...previousData,
        newTodo,
      ]);
    },
  });
};
