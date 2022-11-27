import React, { FC } from "react";
import { Skeleton } from "@mui/material";
import { TodoItemWrapper } from "./TodoItemWrapper";
import { TodoItemsLayout } from "./TodoItemsLayout";

const keysArray = Array.from(Array(4).keys());

export const ToDoItemsSkeleton: FC = () => {
  return (
    <TodoItemsLayout>
      {keysArray.map((key) => (
        <TodoItemWrapper key={key}>
          <Skeleton sx={{ width: "100%" }} />
        </TodoItemWrapper>
      ))}
    </TodoItemsLayout>
  );
};
