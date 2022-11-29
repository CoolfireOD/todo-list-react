import React, { useRef, useState } from "react";
import { useListDeleteMutation } from "../hooks/useListDeleteMutation";
import { Link, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodoListsItemWrapper } from "./TodoListsItemWrapper";
import ToDoDeletedItemContent from "../../../components/UndoContent";

interface ToDoListsItemProps {
  id: string;
  description: string;
}

const TIME_TO_AUTO_DELETE_MS = 3000;

export const ToDoListsItem: React.FC<ToDoListsItemProps> = ({
  id,
  description,
}) => {
  const [isDeleted, setDeleted] = useState(false);
  const autoDeleteStartTimeRef = useRef<number>();
  const intervalIdRef = useRef<ReturnType<typeof setInterval>>();

  const { mutate: deleteList } = useListDeleteMutation();

  function handleDelete(listId: string) {
    autoDeleteStartTimeRef.current = Date.now();
    setDeleted(true);

    intervalIdRef.current = setInterval(() => {
      if (
        Date.now() - autoDeleteStartTimeRef.current! <=
        TIME_TO_AUTO_DELETE_MS
      )
        return;

      deleteList(listId);
      clearInterval(intervalIdRef.current);
    }, 100);
  }

  return (
    <TodoListsItemWrapper key={id}>
      {!isDeleted && (
        <>
          <Link href={`/lists/${id}`}>{description}</Link>
          <IconButton onClick={() => handleDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )}
      {isDeleted && (
        <ToDoDeletedItemContent
          startTime={autoDeleteStartTimeRef.current!}
          durationMs={TIME_TO_AUTO_DELETE_MS}
          onUndo={() => {
            setDeleted(false);
            clearInterval(intervalIdRef.current);
          }}
          description={"List has been deleted"}
        />
      )}
    </TodoListsItemWrapper>
  );
};
