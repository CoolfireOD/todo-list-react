import React from "react";
import "./AddTodoItemInput.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
          inputProps={{ maxLength: 40 }}
          value={value}
          onChange={handleChange}
        />
      </div>

      <Button
        variant="contained"
        className="add-todo-item__add-btn"
        onClick={handleAddTodoItem}
      >
        add
      </Button>
    </div>
  );
};

export default AddTodoItemInput;
