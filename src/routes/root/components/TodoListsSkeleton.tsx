import React, { FC } from "react";
import { Skeleton } from "@mui/material";
import { TodoListsLayout } from "./TodoListsLayout";
import { TodoListsItemWrapper } from "./TodoListsItemWrapper";

const keysArray = Array.from(Array(3).keys());

export const TodoListsSkeleton: FC = () => {
  return (
    <TodoListsLayout>
      {keysArray.map((key) => (
        <TodoListsItemWrapper key={key}>
          <Skeleton width={120} />
        </TodoListsItemWrapper>
      ))}
    </TodoListsLayout>
  );
};
