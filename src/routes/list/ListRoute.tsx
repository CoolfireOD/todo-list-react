import React, { FC, useEffect, useState } from "react";
import ToDoListHeader from "./components/ToDoListHeader";
import ToDoList from "./components/ToDoList";
import AddTodoItemInput from "./components/AddTodoItemInput";
import { TodoItem, TodoList } from "../../types";
import type { DropResult } from "react-beautiful-dnd";
import { Box } from "@mui/material";
import { BASE_URL } from "../../const";

export const ListRoute: FC = () => {
  const list: TodoList = { id: "mockId", name: "new list", items: [] };
  const [value, setValue] = useState("");
  const [todoItems, setTodoItems] = useState<TodoItem[]>(list.items || []);

  useEffect(() => {
    list.items = todoItems;
    fetch(BASE_URL + `/items`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
  }, [todoItems]);

  function toggleTodoItem(id: number) {
    setTodoItems((prevTodoItems) =>
      prevTodoItems.map((item) => {
        if (item.id === id) item.completed = !item.completed;

        return item;
      })
    );
  }

  function addTodoItem() {
    if (value.trim() === "") return;

    const hasDuplicate = todoItems.some((item) => item.description === value);

    if (hasDuplicate) {
      alert(`You can't add task with the same name`);
      return;
    }

    const newItem: TodoItem = {
      id: Date.now(),
      description: value,
      completed: false,
      listId: list.id,
    };

    setTodoItems([...todoItems, newItem]);
    setValue("");
  }

  function deleteTodoItem(id: number) {
    setTodoItems((prevTodoItems) =>
      prevTodoItems.filter((item) => item.id !== id)
    );
  }

  function onDragEnd(result: DropResult) {
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

    const newTodoItems = Array.from(todoItems);
    const draggedItem = todoItems[source.index];

    // delete dragged item from the original array
    newTodoItems.splice(source.index, 1);
    // insert dragged item on its new place
    newTodoItems.splice(destination.index, 0, draggedItem);

    setTodoItems(newTodoItems);
  }

  return (
    <Box sx={{ display: "flex", rowGap: 3, flexDirection: "column" }}>
      <ToDoListHeader todoListName={list.name} />
      <AddTodoItemInput
        value={value}
        onInputChange={setValue}
        onTodoItemAdd={addTodoItem}
      />
      <ToDoList
        items={todoItems}
        onToggle={toggleTodoItem}
        onDelete={deleteTodoItem}
        onDragEnd={onDragEnd}
      />
    </Box>
  );
};
