import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";

interface ToDoItemProps {
  description: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  description,
  completed,
  onToggle,
  onDelete,
}) => {
  //todo: use "sx" property instead of classNames + remove 'classnames' node module from package.json
  return (
    <Box
      sx={{
        display: "flex",
        columnGap: 2,
        alignItems: "center",
        fontSize: "18px",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
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
            textDecoration: completed ? "line-through" : "",
          }}
        >
          {description}
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={onDelete}
        sx={{
          height: "25px",
          width: "5rem",
        }}
      >
        <MoreHorizIcon />
      </Button>
    </Box>
  );
};

export default ToDoItem;
