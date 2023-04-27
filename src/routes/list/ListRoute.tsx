import React, { FC } from "react";
import ToDoListHeader from "./components/ToDoListHeader";
import ToDoList from "./components/ToDoList";
import AddToDoItemInput from "./components/AddTodoItemInput";
import { Box } from "@mui/material";
import { ToDoItemsSkeleton } from "./components/ToDoItemsSkeleton";

export const ListRoute: FC = () => {
  return (
    <Box sx={{ display: "flex", rowGap: 3, flexDirection: "column" }}>
      <ToDoListHeader />
      <AddToDoItemInput />
      <React.Suspense fallback={<ToDoItemsSkeleton />}>
        <ToDoList />
      </React.Suspense>
    </Box>
  );
};
