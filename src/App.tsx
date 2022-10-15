import "./App.css";
import React, { useEffect, useState } from "react";
import ToDoList from "./ToDoList/ToDoList";
import AddTodoItemInput from "./AddTodoItemInput/AddTodoItemInput";
import { getItemsFromCache } from "./utils";
import { TodoItem } from "./types";
import { Container } from "@mui/system";
function App() {
  const [value, setValue] = useState("");

  const [todoItems, setTodoItems] = useState<TodoItem[]>(
    getItemsFromCache() || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todoItems));
  }, [todoItems]);

  function handleInputChange(value: string) {
    setValue(value);
  }

  function toggleTodoItem(id: number) {
    const newTodoItems = todoItems.map((item) => {
      if (item.id === id) item.completed = !item.completed;
      return item;
    });

    setTodoItems(newTodoItems);
  }

  function addTodoItem(value: string) {
    if (value === "") return;

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
    setTodoItems(todoItems.filter((item) => item.id !== id));
  }

  function handleClickOnTodoItem(id: number) {
    const index = todoItems.map((item) => item.id).indexOf(id);
    alert(todoItems[index].description);
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        pt: 4,
        pb: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: "1rem",
      }}
    >
      <AddTodoItemInput
        value={value}
        onInputChange={handleInputChange}
        onTodoItemAdd={addTodoItem}
      />
      <ToDoList
        items={todoItems}
        onClick={handleClickOnTodoItem}
        onToggle={toggleTodoItem}
        onDelete={deleteTodoItem}
      />
    </Container>
  );
}

export default App;
