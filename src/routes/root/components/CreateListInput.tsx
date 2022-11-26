import React, { FC, FormEventHandler, useState } from "react";
import { TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as API from "../api";
import { useNavigate } from "react-router-dom";

export const CreateListInput: FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [value, setValue] = useState("");

  const { mutate: postList } = useMutation(API.postList, {
    onSuccess: (newList) => {
      queryClient.setQueryData(
        ["items", { listId: newList.id }],
        () => newList.items
      );
      navigate(`/lists/${newList.id}`); //todo: store routes in const
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (value.trim() === "") throw new Error();

    const list = { name: value };

    postList(list);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
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
