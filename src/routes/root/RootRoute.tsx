import React, { FC } from "react";
import { Box, Button, TextField } from "@mui/material";

export const RootRoute: FC = () => {
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
      />
      <Button variant="contained" type="submit">
        Create
      </Button>
    </Box>
  );
};
