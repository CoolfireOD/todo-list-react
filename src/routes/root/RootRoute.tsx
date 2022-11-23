import React, { FC, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../const";
import { TodoList } from "../../types";

async function createList(value: string) {
  if (value.trim() === "") throw new Error();

  const list = {
    name: value,
  };

  const response = await fetch(BASE_URL + `/lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(list),
  });

  return (await response.json()) as TodoList;
}

export const RootRoute: FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <Box
      sx={{
        display: "flex",
        columnGap: 2,
        alignItems: "flex-end",
      }}
    >
      <TextField
        label="List name"
        variant="standard"
        inputProps={{ maxLength: 64 }}
        fullWidth
        onChange={handleChange}
      />
      <Button
        variant="contained"
        type="submit"
        onClick={async () => {
          const { id } = await createList(value);
          navigate(`/lists/${id}`);
        }}
      >
        Create
      </Button>
    </Box>
  );
};
