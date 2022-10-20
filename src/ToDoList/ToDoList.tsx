import React from "react";
import ToDoItem from "../ToDoItem/ToDoItem";
import { TodoItem } from "../types";
import Box from "@mui/material/Box";

interface ToDoListProps {
  items: TodoItem[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ items, onDelete, onToggle }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 2,
        width: "100%",
      }}
    >
      {items.map((item) => (
        <ToDoItem
          key={item.id}
          description={item.description}
          completed={item.completed}
          onToggle={() => onToggle(item.id)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </Box>
  );
};

export default ToDoList;
