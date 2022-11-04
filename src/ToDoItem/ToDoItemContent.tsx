import React, { FC, ReactNode } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";

type ToDoItemContentProps = {
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  description: ReactNode;
};

const ToDoItemContent: FC<ToDoItemContentProps> = ({
  completed,
  onToggle,
  description,
  onDelete,
}) => {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: 1,
        }}
      >
        <Checkbox
          color="info"
          checked={completed}
          onChange={onToggle}
          sx={{
            height: "20px",
            width: "20px",
          }}
        />
        <Typography
          sx={{
            textAlign: "left",
            wordBreak: "break-word",
            position: "relative",
            textDecoration: completed ? "line-through" : "none",
          }}
        >
          {description}
        </Typography>
      </Box>
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default ToDoItemContent;
