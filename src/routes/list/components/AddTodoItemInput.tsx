import React, { FormEventHandler, useState } from "react";
import TextField from "@mui/material/TextField";
import { useIdParam } from "../../../hooks/useIdParam";
import { usePostTodoMutation } from "../hooks/usePostTodoMutation";

const AddTodoItemInput: React.FC = () => {
  const listId = useIdParam();

  const [value, setValue] = useState("");

  const clearValue = () => setValue("");

  const { mutate: postTodo } = usePostTodoMutation(clearValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (value.trim() === "") return;

    postTodo({
      description: value,
      completed: false,
      listId,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Task name"
        placeholder="Fill in and press Enter"
        variant="standard"
        inputProps={{ maxLength: 64 }}
        value={value}
        onChange={handleChange}
        fullWidth
      />
    </form>
  );
};

export default AddTodoItemInput;
