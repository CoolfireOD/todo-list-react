import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LISTS_QUERY_KEY } from "../../../const";
import { TodoList } from "../../../types";
import * as API from "../api";

export const useListDeleteMutation = () => {
  const queryClient = useQueryClient();
  const queryKey = LISTS_QUERY_KEY;

  return useMutation<
    void,
    unknown,
    string,
    { previousLists: TodoList[] | undefined }
  >(API.deleteList, {
    onMutate: async (deleteId) => {
      await queryClient.cancelQueries({ queryKey });
      const previousLists = queryClient.getQueryData<TodoList[]>(queryKey);

      queryClient.setQueryData<TodoList[]>(queryKey, (previousLists) => {
        return previousLists!.filter((previous) => previous.id !== deleteId);
      });

      return { previousLists };
    },
    onError: (err, newList, context) => {
      queryClient.setQueryData<TodoList[]>(queryKey, context!.previousLists);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
