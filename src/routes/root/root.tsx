import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  TextField,
  CssBaseline,
  Container,
} from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function Root() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mode: "light" | "dark" = prefersDarkMode ? "dark" : "light";

  return (
    <>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode,
          },
        })}
      >
        <CssBaseline />
        <Container
          maxWidth="sm"
          sx={{
            pt: 4,
            pb: 4,
            display: "flex",
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
              label="To-do list name"
              variant="standard"
              inputProps={{ maxLength: 64 }}
              fullWidth
            />
            <Button variant="contained" type="submit">
              New
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Root;
