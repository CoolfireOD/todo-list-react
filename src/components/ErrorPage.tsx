import { Box, Alert } from "@mui/material";
import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as unknown;
  console.error(error);

  return (
    <Box>
      <Alert severity="error" variant="filled">
        <strong>Unexpected error has occurred</strong>
      </Alert>
    </Box>
  );
}
