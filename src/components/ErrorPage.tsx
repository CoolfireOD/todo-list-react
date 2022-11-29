import { Box, Alert } from "@mui/material";
import React from "react";
import { useRouteError } from "react-router-dom";
import { UNEXPECTED_ERROR_MESSAGE } from "../const";

export default function ErrorPage() {
  const error = useRouteError() as unknown;
  console.error(error);

  return (
    <Box>
      <Alert severity="error" variant="filled">
        <strong>{UNEXPECTED_ERROR_MESSAGE}</strong>
      </Alert>
    </Box>
  );
}
