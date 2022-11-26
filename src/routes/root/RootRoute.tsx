import React, { FC, useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_DOMAIN } from "../../const";
import { TodoList } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getLists } from "./api";
import Link from "@mui/material/Link";

async function createList(value: string) {
  if (value.trim() === "") throw new Error();

  const list = {
    name: value,
  };

  const response = await fetch(API_DOMAIN + `/lists`, {
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
  const { data: listItems } = useQuery(["lists"], getLists);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  const hasListItems = listItems && listItems.length > 0;

  return (
    <Box
      sx={{
        display: "flex",
        rowGap: 4,
        flexDirection: "column",
      }}
    >
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
      {hasListItems && (
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
          {listItems.map((list, index) => {
            return (
              <Paper
                key={index}
                sx={{
                  px: 2,
                  py: 1,
                  display: "flex",
                  columnGap: 2,
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Link href={`/lists/${list.id}`}>{list.name}</Link>
              </Paper>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
