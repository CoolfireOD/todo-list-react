import React, { FC, ReactNode } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

type PushOptions = {
  message: string;
  type: "error" | "warning" | "info" | "success";
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
  delay?: number | null;
};

type Push = (options: PushOptions) => void;

type NotificationsContextValue = {
  push: Push;
};

export const NotificationsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export function useNotifications(): NotificationsContextValue {
  const { enqueueSnackbar } = useSnackbar();

  const push: Push = ({
    message,
    type,
    vertical = "bottom",
    horizontal = "left",
    delay = 5000,
  }) => {
    enqueueSnackbar(message, {
      variant: type,
      anchorOrigin: { vertical, horizontal },
      autoHideDuration: delay,
    });
  };

  return { push };
}
