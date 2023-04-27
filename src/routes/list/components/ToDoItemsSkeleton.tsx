import React, { FC } from "react";
import { Skeleton } from "@mui/material";
import { ToDoItemWrapper } from "./ToDoItemWrapper";
import { ToDoItemsLayout } from "./ToDoItemsLayout";

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
