import React, { FC } from "react";
import { Box } from "@mui/material";
import { CreateListInput } from "./components/CreateListInput";
import { TodoLists } from "./components/TodoLists";
import { TodoListsSkeleton } from "./components/TodoListsSkeleton";

export const RootRoute: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        rowGap: 4,
        flexDirection: "column",
      }}
    >
      <CreateListInput />
      <React.Suspense fallback={<TodoListsSkeleton />}>
        <TodoLists />
      </React.Suspense>
    </Box>
  );
};
