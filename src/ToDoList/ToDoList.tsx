import React from "react";
import ToDoItem from "../ToDoItem/ToDoItem";
import "./ToDoList.css";
import { TodoItem } from "../types";

interface ToDoListProps {
  items: TodoItem[];
  onClick: (id: number) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({
  items,
  onClick,
  onDelete,
  onToggle,
}) => {
  return (
    <div className="items">
      {items.map((item) => (
        <ToDoItem
          key={item.id}
          description={item.description}
          completed={item.completed}
          onClick={() => onClick(item.id)}
          onToggle={() => onToggle(item.id)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  );
};

export default ToDoList;
