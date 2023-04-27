import React, { FC } from "react";
import { Skeleton } from "@mui/material";
import { ToDoItemWrapper } from "./TodoItemWrapper";
import { ToDoItemsLayout } from "./TodoItemsLayout";

const keysArray = Array.from(Array(4).keys());

export const ToDoItemsSkeleton: FC = () => {
  return (
    <ToDoItemsLayout>
      {keysArray.map((key) => (
        <ToDoItemWrapper key={key}>
          <Skeleton sx={{ width: "100%" }} />
        </ToDoItemWrapper>
      ))}
    </ToDoItemsLayout>
  );
};
