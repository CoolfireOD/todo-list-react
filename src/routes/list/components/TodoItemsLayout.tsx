import React, { FC, ReactNode } from "react";
import { Box } from "@mui/material";

type ToDoItemsLayoutProps = {
  children: ReactNode;
};

export const ToDoItemsLayout: FC<ToDoItemsLayoutProps> = ({ children }) => {
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
