import React, { FC, ReactNode } from "react";
import { Box } from "@mui/material";

type TodoListsLayoutProps = {
  children: ReactNode;
};

export const TodoListsLayout: FC<TodoListsLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
      {children}
    </Box>
  );
};
