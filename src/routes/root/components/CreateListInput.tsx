import React, { FC, FormEventHandler, useState } from "react";
import { TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as API from "../api";
import { useNavigate } from "react-router-dom";
import { useProgressBar } from "../../../components/ProgressBarProvider";

export const CreateListInput: FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { start, finish } = useProgressBar();

  const [value, setValue] = useState("");

  const { mutate: postList, isLoading } = useMutation(API.postList, {
    onMutate: start,
    onSuccess: (newList) => {
      queryClient.setQueryData(
        ["items", { listId: newList.id }],
        () => newList.items
      );
      navigate(`/lists/${newList.id}`); //todo: store routes in const
    },
    onSettled: finish,
  });

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
