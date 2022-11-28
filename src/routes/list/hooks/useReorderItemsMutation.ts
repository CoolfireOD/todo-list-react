import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoItem } from "../../../types";
import * as API from "../api";
import { useIdParam } from "../../../hooks/useIdParam";
import { getTodosQueryKey } from "../utils";
import { useNotifications } from "../../../components/NotificationsProvider";
import { UNEXPECTED_ERROR_MESSAGE } from "../../../const";

export const useReorderItemsMutation = () => {
  const queryClient = useQueryClient();
  const listId = useIdParam();
  const queryKey = getTodosQueryKey({ listId });
  const { push } = useNotifications();

  return useMutation<
    TodoItem[],
    unknown,
    { items: TodoItem[]; listId: string },
    { previousTodos: TodoItem[] | undefined }
  >(API.reorderTodos, {
    onMutate: async ({ items: newItems }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousTodos = queryClient.getQueryData<TodoItem[]>(queryKey);

      queryClient.setQueryData<TodoItem[]>(queryKey, () => newItems);

      return { previousTodos };
    },
    onError: (err, variables, context) => {
      push({
        message: UNEXPECTED_ERROR_MESSAGE,
        type: "error",
        horizontal: "right",
        delay: 3000,
      });
      queryClient.setQueryData<TodoItem[]>(queryKey, context!.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
