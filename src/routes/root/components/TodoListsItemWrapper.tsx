import React, { FC, ReactNode } from "react";
import { Paper } from "@mui/material";

type TodoListsItemWrapperProps = {
  children: ReactNode;
};

export const TodoListsItemWrapper: FC<TodoListsItemWrapperProps> = ({
  children,
}) => {
  return (
    <Paper
      sx={{
        px: 2,
        py: 1,
        display: "flex",
        columnGap: 2,
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {children}
    </Paper>
  );
};
