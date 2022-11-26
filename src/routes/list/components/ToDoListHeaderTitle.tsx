import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useIdParam } from "../../../hooks/useIdParam";
import { getListQueryKey } from "../../../utils/getListQueryKey";
import { useQuery } from "@tanstack/react-query";
import * as API from "../api";

export const ToDoListHeaderTitle: FC = () => {
  const listId = useIdParam();
  const queryKey = getListQueryKey(listId);
  const { data: list } = useQuery(queryKey, () => API.getList(listId), {
    suspense: true,
  });

  return (
    <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
      {list?.name || "Loading..."}
    </Typography>
  );
};
