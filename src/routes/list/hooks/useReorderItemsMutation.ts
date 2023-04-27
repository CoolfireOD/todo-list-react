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
    { itemIds: string[]; listId: string },
    { previousTodos: TodoItem[] | undefined }
  >(API.reorderTodos, {
    onMutate: async ({ itemIds }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousTodos = queryClient.getQueryData<TodoItem[]>(queryKey);

      const newItems = itemIds.map((id) => {
        const todo = previousTodos?.find((todo) => todo.id === id);

        if (!todo)
          throw new Error("Could not map previous todos to reordered ids");

        return todo;
      });

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
