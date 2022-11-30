import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoList } from "../../../types";
import * as API from "../api";
import { LISTS_QUERY_KEY } from "../const";

export const useListDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    unknown,
    string,
    { previousLists: TodoList[] | undefined }
  >(API.deleteList, {
    onMutate: async (deleteId) => {
      await queryClient.cancelQueries({ queryKey: LISTS_QUERY_KEY });
      const previousLists =
        queryClient.getQueryData<TodoList[]>(LISTS_QUERY_KEY);

      queryClient.setQueryData<TodoList[]>(LISTS_QUERY_KEY, (previousLists) => {
        return previousLists!.filter((previous) => previous.id !== deleteId);
      });

      return { previousLists };
    },
    onError: (err, newList, context) => {
      queryClient.setQueryData<TodoList[]>(
        LISTS_QUERY_KEY,
        context!.previousLists
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: LISTS_QUERY_KEY });
    },
  });
};
