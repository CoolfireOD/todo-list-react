import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AppContainer } from "./components/AppContainer";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { getTheme } from "./theme";
import { ProgressBarProvider } from "./components/ProgressBarProvider";

const queryClient = new QueryClient();

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mode: "light" | "dark" = prefersDarkMode ? "dark" : "light";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={createTheme(getTheme(mode))}>
        <CssBaseline />
        <ProgressBarProvider>
          <AppContainer>
            <RouterProvider router={router} />
          </AppContainer>
        </ProgressBarProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
