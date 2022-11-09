import React from "react";
import ToDoItem from "./ToDoItem";
import { TodoItem } from "../../../types";
import { Container, Box } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { resourceUsage } from "process";
import type {
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";

interface ToDoListProps {
  items: TodoItem[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onDragEnd: (result: any) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({
  items,
  onDelete,
  onToggle,
  onDragEnd,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"todo-tasks"}>
        {(provided: DroppableProvided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {items.map((item, index) => (
              <ToDoItem
                key={item.id}
                id={item.id}
                index={index}
                description={item.description}
                completed={item.completed}
                onToggle={() => onToggle(item.id)}
                onDelete={() => onDelete(item.id)}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ToDoList;
