import React, { FC, ReactNode } from "react";
import { Paper } from "@mui/material";

type ToDoItemWrapperProps = {
  children: ReactNode;
};

export const ToDoItemWrapper: FC<ToDoItemWrapperProps> = ({ children }) => {
  return (
    <Paper
      sx={{
        px: 2,
        py: 0.5,
        mb: "12px",
        display: "flex",
        columnGap: 2,
        alignItems: "center",
        fontSize: "18px",
        width: "100%",
        height: "48px",
        justifyContent: "space-between",
      }}
    >
      {children}
    </Paper>
  );
};
