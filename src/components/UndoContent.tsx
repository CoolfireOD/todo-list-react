import React, { FC } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

type UndoContentProps = {
  seconds: number;
  percents: number;
  description: string;
  onUndo: () => void;
};

const UndoContent: FC<UndoContentProps> = ({
  onUndo,
  description,
  seconds,
  percents,
}) => {
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
            value={percents}
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
              {seconds}
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
