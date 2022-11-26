import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoItem } from "../../../types";
import * as API from "../api";
import { useIdParam } from "../../../hooks/useIdParam";

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();
  const listId = useIdParam();
  const queryKey = ["items", { listId }];

  return useMutation<
    TodoItem,
    unknown,
    TodoItem,
    { previousTodos: TodoItem[] | undefined }
  >(API.updateTodo, {
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey });

      const previousTodos = queryClient.getQueryData<TodoItem[]>(queryKey);

      queryClient.setQueryData<TodoItem[]>(queryKey, (previousTodos) => {
        return previousTodos!.map((previous) => {
          return previous.id === updated.id ? updated : previous;
        });
      });

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData<TodoItem[]>(queryKey, context!.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
