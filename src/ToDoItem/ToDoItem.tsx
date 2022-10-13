import React from "react";
import "./ToDoItem.css";
import classNames from "classnames";

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
      <input
        type="checkbox"
        className="todo-item__input"
        checked={completed}
        onChange={onToggle}
      />
      <button
        className="todo-item__delete-btn"
        onClick={() => {
          setTimeout(onDelete, 100);
        }}
      >
        del
      </button>
    </div>
  );
};

export default ToDoItem;
