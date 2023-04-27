import React from "react";
import ToDoItem from "./ToDoItem";
import { Box } from "@mui/material";
import type { DroppableProvided } from "react-beautiful-dnd";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useQuery } from "@tanstack/react-query";
import { useIdParam } from "../../../hooks/useIdParam";
import * as API from "../api";
import { getTodosQueryKey } from "../utils";
import { useReorderItemsMutation } from "../hooks/useReorderItemsMutation";

const ToDoList: React.FC = () => {
  const listId = useIdParam();
  const queryKey = getTodosQueryKey({ listId });

  const { data: todoItems } = useQuery(queryKey, () => API.getTodos(listId), {
    suspense: true,
  });
  const { mutate: reorderTodos } = useReorderItemsMutation();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newTodoItems = [...todoItems!];
    const draggedItem = todoItems![source.index];

    // delete dragged item from the original array
    newTodoItems.splice(source.index, 1);
    // insert dragged item on its new place
    newTodoItems.splice(destination.index, 0, draggedItem);

    const itemIds = newTodoItems.map((item) => item.id);

    reorderTodos({
      itemIds,
      listId,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
            {todoItems?.map((item, index) => (
              <ToDoItem
                key={item.id}
                id={item.id}
                index={index}
                description={item.description}
                completed={item.completed}
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
