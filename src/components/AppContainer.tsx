import React, { FC, ReactNode } from "react";
import { Container } from "@mui/material";

type AppContainerProps = {
  children?: ReactNode;
};

export const AppContainer: FC<AppContainerProps> = ({ children }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        pt: 4,
        pb: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Container>
  );
};
