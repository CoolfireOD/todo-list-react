import React, { FC, ReactNode } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQueryClient } from "@tanstack/react-query";
import { useIdParam } from "../../../hooks/useIdParam";
import { TodoItem } from "../../../types";
import { useUpdateTodoMutation } from "../hooks/useUpdateTodoMutation";

type ToDoItemContentProps = {
  completed: boolean;
  description: ReactNode;
  todoItemId: string;
  onDelete: () => void;
};

const ToDoItemContent: FC<ToDoItemContentProps> = ({
  completed,
  description,
  todoItemId,
  onDelete,
}) => {
  const queryClient = useQueryClient();
  const listId = useIdParam();
  const queryKey = ["items", { listId }];

  const { mutate: updateTodo } = useUpdateTodoMutation();

  const handleToggle = () => {
    const todoItems = queryClient.getQueryData<TodoItem[]>(queryKey);

    const itemToToggle = todoItems!.find((item) => item.id === todoItemId);

    if (!itemToToggle) throw new Error("Could not find item");

    updateTodo({
      ...itemToToggle,
      completed: !itemToToggle.completed,
    });
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: 1,
        }}
      >
        <Checkbox
          color="info"
          checked={completed}
          onChange={handleToggle}
          sx={{
            height: "20px",
            width: "20px",
          }}
        />
        <Typography
          sx={{
            textAlign: "left",
            wordBreak: "break-word",
            position: "relative",
            textDecoration: completed ? "line-through" : "none",
          }}
        >
          {description}
        </Typography>
      </Box>
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default ToDoItemContent;
