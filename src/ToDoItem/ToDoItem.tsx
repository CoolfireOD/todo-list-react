import React from "react";
import "./ToDoItem.css";
import classNames from "classnames";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";

interface ToDoItemProps {
  description: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onClick: () => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  description,
  completed,
  onToggle,
  onDelete,
  onClick,
}) => {
  const classes = classNames("todo-item__description", {
    _completed: completed,
  });
  return (
    <div className="todo-item">
      <p onClick={onClick} className={classes}>
        {description}
      </p>
      <Checkbox
        color="info"
        className="todo-item__input"
        checked={completed}
        onChange={onToggle}
      />
      <Button
        variant="contained"
        className="todo-item__delete-btn"
        onClick={() => {
          setTimeout(onDelete, 100);
        }}
      >
        del
      </Button>
    </div>
  );
};

export default ToDoItem;
