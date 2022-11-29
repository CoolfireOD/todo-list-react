import React, { FC, useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

type UndoContentProps = {
  startTime: number;
  durationMs: number;
  description: string;
  onUndo: () => void;
};

const UndoContent: FC<UndoContentProps> = ({
  onUndo,
  startTime,
  durationMs,
  description,
}) => {
  // progress for deleted item to disappear in %
  const [countdown, setCountdown] = useState(100);
  const timerRef = useRef<number>();

  useEffect(() => {
    timerRef.current = Date.now();

    const finalTime = startTime + durationMs;

    const timer = setInterval(() => {
      const currentTime = Date.now();
      const percent = Math.round(
        (finalTime - currentTime) / (durationMs / 100)
      );

      if (percent >= 0) {
        setCountdown(percent);
      }
    }, 20);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: 2,
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={countdown}
            sx={{
              transition: "none",
              "& .MuiCircularProgress-circle": {
                transition: "none",
              },
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >
              {Math.ceil(countdown / 33)}
            </Typography>
          </Box>
        </Box>
        <Typography>{description}</Typography>
      </Box>
      <Box>
        <Button color="secondary" size="small" onClick={onUndo}>
          UNDO
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default UndoContent;
