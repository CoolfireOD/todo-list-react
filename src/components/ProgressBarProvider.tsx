import React, {
  FC,
  createContext,
  ReactNode,
  useState,
  useContext,
} from "react";
import { LinearProgress } from "@mui/material";

type ProgressBarContextValue = {
  start: () => void;
  finish: () => void;
};

const ProgressBarContext = createContext<ProgressBarContextValue | null>(null);

export const ProgressBarProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isPending, setIsPending] = useState(false);

  return (
    <ProgressBarContext.Provider
      value={{
        start: () => setIsPending(true),
        finish: () => setIsPending(false),
      }}
    >
      {children}
      {isPending && (
        <LinearProgress
          sx={{
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        />
      )}
    </ProgressBarContext.Provider>
  );
};

export function useProgressBar() {
  const value = useContext(ProgressBarContext);

  if (value === null)
    throw new Error(
      "Seems you forgot to wrap a component with ProgressBarProvider"
    );

  return value;
}
