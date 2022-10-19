import React from "react";
import "./ToDoItem.css";
import classNames from "classnames";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
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
  });
  return (
    <div className="todo-item">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: ".5rem",
        }}
      >
        <Checkbox
          color="info"
          className="todo-item__input"
          checked={completed}
          onChange={onToggle}
        />
        <p className={classes}>{description}</p>
      </Box>
      <Button
        variant="contained"
        className="todo-item__delete-btn"
        onClick={() => {
          setTimeout(onDelete, 100);
        }}
      >
        <MoreHorizIcon />
      </Button>
    </div>
  );
};

export default ToDoItem;
