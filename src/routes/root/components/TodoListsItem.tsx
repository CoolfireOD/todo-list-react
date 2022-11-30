import React from "react";
import { useListDeleteMutation } from "../hooks/useListDeleteMutation";
import { Link, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodoListsItemWrapper } from "./TodoListsItemWrapper";
import UndoContent from "../../../components/UndoContent";
import { useCountdown } from "../../../hooks/useCountdown";

interface ToDoListsItemProps {
  id: string;
  description: string;
}

export const ToDoListsItem: React.FC<ToDoListsItemProps> = ({
  id,
  description,
}) => {
  const { mutate: deleteList } = useListDeleteMutation();
  const { start, cancel, seconds, percents } = useCountdown({
    action: () => deleteList(id),
  });

  function handleDelete() {
    start();
  }

  const isCountdownPending = seconds !== null && percents !== null;

  return (
    <TodoListsItemWrapper key={id}>
      {!isCountdownPending && (
        <>
          <Link href={`/lists/${id}`}>{description}</Link>
          <IconButton onClick={() => handleDelete()}>
            <DeleteIcon />
          </IconButton>
        </>
      )}
      {isCountdownPending && (
        <UndoContent
          seconds={seconds}
          percents={percents}
          onUndo={cancel}
          description={"List has been deleted"}
        />
      )}
    </TodoListsItemWrapper>
  );
};
