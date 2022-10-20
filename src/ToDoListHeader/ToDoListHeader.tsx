import React, { useEffect, useState } from "react";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Box from "@mui/material/Box";
import {
  Snackbar,
  IconButton,
  Tooltip,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ToDoListHeader: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  function handleClick() {
    setOpen(true);
    navigator.clipboard.writeText(window.location.href);
  }

  function handleClose(event: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        columnGap: "2rem",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
        My to-do list
      </Typography>
      {/*todo: use Snackbar for feedback*/}
      <IconButton onClick={handleClick}>
        <InsertLinkIcon sx={{ rotate: "-45deg" }} />
      </IconButton>
      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          URL is copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ToDoListHeader;
