import React from "react";
import "./AddTodoItemInput.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type AddTodoItemInputProps = {
  onInputChange: (value: string) => void;
  onTodoItemAdd: () => void;
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

  return (
      //todo: use sx instead of classNames
    <div className="add-todo-item">
      <div className="add-todo-item__input-wrapper input-wrapper">
        <TextField
          onKeyUp={(event) => {
            if (event.key === "Enter") onTodoItemAdd();
          }}
          className="input-wrapper__input"
          label="Task name"
          variant="standard"
          inputProps={{ maxLength: 64 }}
          value={value}
          onChange={handleChange}
        />
      </div>
      <Button
        variant="contained"
        className="add-todo-item__add-btn"
        onClick={onTodoItemAdd}
      >
        add
      </Button>
    </div>
  );
};

export default AddTodoItemInput;
