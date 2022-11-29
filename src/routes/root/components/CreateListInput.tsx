import React, { FC, FormEventHandler, useState } from "react";
import { TextField } from "@mui/material";
import { usePostListMutation } from "../hooks/usePostListMutation";

export const CreateListInput: FC = () => {
  const [value, setValue] = useState("");

  const { mutate: postList, isLoading } = usePostListMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (value.trim() === "") return;

    const list = { name: value };

    postList(list);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        disabled={isLoading}
        placeholder="Fill in and press enter"
        label="List name"
        variant="standard"
        inputProps={{ maxLength: 64 }}
        fullWidth
        onChange={handleChange}
      />
    </form>
  );
};
