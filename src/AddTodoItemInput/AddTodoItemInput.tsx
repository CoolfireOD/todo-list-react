import React from "react";
import "./AddTodoItemInput.css";

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
        <input
          type="text"
          onKeyUp={(event: any) => {
            if (event.key === "Enter") handleAddTodoItem();
          }}
          className="input-wrapper__input"
          id="standard-basic"
          value={value}
          onChange={handleChange}
        />
      </div>

      <button className="add-todo-item__add-btn" onClick={handleAddTodoItem}>
        add
      </button>
    </div>
  );
};

export default AddTodoItemInput;
