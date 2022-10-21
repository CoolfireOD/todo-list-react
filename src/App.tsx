import React, { useEffect, useState } from "react";
import ToDoListHeader from "./ToDoListHeader/ToDoListHeader";
import ToDoList from "./ToDoList/ToDoList";
import AddTodoItemInput from "./AddTodoItemInput/AddTodoItemInput";
import { getItemsFromCache } from "./utils";
import { TodoItem } from "./types";
import { Container } from "@mui/system";
import { CssBaseline, IconButton } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const [value, setValue] = useState("");
  const [todoItems, setTodoItems] = useState<TodoItem[]>(
    getItemsFromCache() || []
  );

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const mode: "light" | "dark" = prefersDarkMode ? "dark" : "light";

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
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode,
          },
        })}
      >
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
      </ThemeProvider>
    </>
  );
}

export default App;
