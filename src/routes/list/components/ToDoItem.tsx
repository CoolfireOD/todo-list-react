import React, { useRef, useState } from "react";
import { Paper } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import ToDoItemContent from "./ToDoItemContent";
import UndoContent from "../../../components/UndoContent";
import { useTodoItemDeleteMutation } from "../hooks/useTodoItemDeleteMutation";

interface ToDoItemProps {
  id: string;
  index: number;
  description: string;
  completed: boolean;
}

const TIME_TO_AUTO_DELETE_MS = 3000;

const ToDoItem: React.FC<ToDoItemProps> = ({
  id,
  index,
  description,
  completed,
}) => {
  const [isDeleted, setDeleted] = useState(false);
  const autoDeleteStartTimeRef = useRef<number>();
  const intervalIdRef = useRef<ReturnType<typeof setInterval>>();

  const { mutate: deleteItem } = useTodoItemDeleteMutation();

  function handleDelete() {
    autoDeleteStartTimeRef.current = Date.now();
    setDeleted(true);

    intervalIdRef.current = setInterval(() => {
      if (
        Date.now() - autoDeleteStartTimeRef.current! <=
        TIME_TO_AUTO_DELETE_MS
      )
        return;

      deleteItem(id);
      clearInterval(intervalIdRef.current);
    }, 100);
  }

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          elevation={snapshot.isDragging ? 12 : 1}
          sx={{
            px: 2,
            py: 0.5,
            mb: "12px",
            display: "flex",
            columnGap: 2,
            alignItems: "center",
            fontSize: "18px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {!isDeleted && (
            <ToDoItemContent
              completed={completed}
              todoItemId={id}
              description={description}
              onDelete={handleDelete}
            />
          )}
          {isDeleted && (
            <UndoContent
              startTime={autoDeleteStartTimeRef.current!}
              durationMs={TIME_TO_AUTO_DELETE_MS}
              onUndo={() => {
                setDeleted(false);
                clearInterval(intervalIdRef.current);
              }}
              description={"Task has been deleted"}
            />
          )}
        </Paper>
      )}
    </Draggable>
  );
};

export default ToDoItem;
