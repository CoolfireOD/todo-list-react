import React from "react";
import "./ToDoItem.css";
import classNames from "classnames";
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
  const classes = classNames("todo-item__description", {
    _completed: completed,
  }); //todo: use "sx" property instead of classNames + remove 'classnames' node module from package.json

  return (
    <div className="todo-item">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: 1,
        }}
      >
        <Checkbox
          color="info"
          className="todo-item__input"
          checked={completed}
          onChange={onToggle}
        />
        <Typography className={classes} sx={{ wordBreak: "break-word" }}>
          {description}
        </Typography>
      </Box>
      <Button
        variant="contained"
        className="todo-item__delete-btn"
        onClick={onDelete}
      >
        <MoreHorizIcon />
      </Button>
    </div>
  );
};

export default ToDoItem;
