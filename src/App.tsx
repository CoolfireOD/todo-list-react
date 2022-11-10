import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { RootRoute } from "./routes/root";
import { AppContainer } from "./components/AppContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ListRoute } from "./routes/list";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
  },
  {
    path: "/:id",
    element: <ListRoute />,
  },
]);

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mode: "light" | "dark" = prefersDarkMode ? "dark" : "light";

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode,
        },
      })}
    >
      <CssBaseline />
      <AppContainer>
        <RouterProvider router={router} />
      </AppContainer>
    </ThemeProvider>
  );
}
