import React from "react";
import { Paper } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import ToDoItemContent from "./ToDoItemContent";
import UndoContent from "../../../components/UndoContent";
import { useTodoItemDeleteMutation } from "../hooks/useTodoItemDeleteMutation";
import { useCountdown } from "../../../hooks/useCountdown";

interface ToDoItemProps {
  id: string;
  index: number;
  description: string;
  completed: boolean;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  id,
  index,
  description,
  completed,
}) => {
  const { mutate: deleteItem } = useTodoItemDeleteMutation();

  const { start, cancel, seconds, percents } = useCountdown({
    action: () => deleteItem(id),
  });

  function handleDelete() {
    start();
  }

  const isCountdownPending = seconds !== null && percents !== null;

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
          {!isCountdownPending && (
            <ToDoItemContent
              completed={completed}
              todoItemId={id}
              description={description}
              onDelete={handleDelete}
            />
          )}
          {isCountdownPending && (
            <UndoContent
              seconds={seconds}
              percents={percents}
              onUndo={cancel}
              description={"Task has been deleted"}
            />
          )}
        </Paper>
      )}
    </Draggable>
  );
};

export default ToDoItem;
