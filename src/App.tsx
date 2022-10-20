import React, { useEffect, useState } from "react";
import ToDoListHeader from "./ToDoListHeader/ToDoListHeader";
import ToDoList from "./ToDoList/ToDoList";
import AddTodoItemInput from "./AddTodoItemInput/AddTodoItemInput";
import { getItemsFromCache } from "./utils";
import { TodoItem } from "./types";
import { Container } from "@mui/system";
import { CssBaseline } from "@mui/material";

function App() {
  const [value, setValue] = useState("");
  const [todoItems, setTodoItems] = useState<TodoItem[]>(
    getItemsFromCache() || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todoItems));
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
    };

    setTodoItems([...todoItems, newItem]);
    setValue("");
  }

  function deleteTodoItem(id: number) {
    setTodoItems((prevTodoItems) =>
      prevTodoItems.filter((item) => item.id !== id)
    );
  }

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          pt: 4,
          pb: 4,
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
        }}
      >
        <ToDoListHeader />
        <AddTodoItemInput
          value={value}
          onInputChange={setValue}
          onTodoItemAdd={addTodoItem}
        />
        <ToDoList
          items={todoItems}
          onToggle={toggleTodoItem}
          onDelete={deleteTodoItem}
        />
      </Container>
    </>
  );
}

export default App;
