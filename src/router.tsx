import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootRoute } from "./routes/root";
import ErrorPage from "./components/ErrorPage";
import { ListRoute } from "./routes/list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/lists/:id",
    element: <ListRoute />,
    errorElement: <ErrorPage />,
  },
]);
