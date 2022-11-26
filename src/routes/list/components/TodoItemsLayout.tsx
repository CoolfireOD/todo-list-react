import React, { FC, ReactNode } from "react";
import { Box } from "@mui/material";

type TodoItemsLayoutProps = {
  children: ReactNode;
};

export const TodoItemsLayout: FC<TodoItemsLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};
