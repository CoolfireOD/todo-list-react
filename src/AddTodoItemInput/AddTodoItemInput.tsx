import React from "react";
import "./AddTodoItemInput.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";
import { CustomButtonGray } from "../customElements";

const theme = createTheme({
  palette: {
    info: grey,
  },
});

interface AddTodoItemInputProps {
  onInputChange: (value: string) => void;
  onTodoItemAdd: (value: string) => void;
  value: string;
}

const AddTodoItemInput: React.FC<AddTodoItemInputProps> = ({
  onInputChange,
  onTodoItemAdd,
  value,
}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onInputChange(event.target.value);
  }

  function handleAddTodoItem() {
    onTodoItemAdd(value);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="add-todo-item">
        <div className="add-todo-item__input-wrapper input-wrapper">
          <TextField
            onKeyUp={(event) => {
              if (event.key === "Enter") handleAddTodoItem();
            }}
            color="info"
            className="input-wrapper__input"
            id="standard-basic"
            label="Task name"
            variant="standard"
            value={value}
            onChange={handleChange}
          />
        </div>

        <CustomButtonGray
          variant="contained"
          className="add-todo-item__add-btn"
          onClick={handleAddTodoItem}
        >
          add
        </CustomButtonGray>
      </div>
    </ThemeProvider>
  );
};

export default AddTodoItemInput;
