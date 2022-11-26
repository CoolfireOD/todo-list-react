import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIdParam } from "../../../hooks/useIdParam";
import { TodoItem } from "../../../types";
import * as API from "../api";

export const useTodoItemDeleteMutation = () => {
  const queryClient = useQueryClient();
  const listId = useIdParam();
  const queryKey = ["items", { listId }];

  return useMutation<
    void,
    unknown,
    string,
    { previousTodos: TodoItem[] | undefined }
  >(API.deleteTodo, {
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousTodos = queryClient.getQueryData<TodoItem[]>(queryKey);

      queryClient.setQueryData<TodoItem[]>(queryKey, (previousTodos) => {
        return previousTodos!.filter((previous) => previous.id !== deletedId);
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
