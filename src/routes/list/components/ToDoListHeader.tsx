import React, { useState } from "react";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import { IconButton, Snackbar, Typography } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ToDoListHeaderProps = {
  todoListName: string;
};

const ToDoListHeader: React.FC<ToDoListHeaderProps> = ({ todoListName }) => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

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
      <IconButton onClick={() => navigate("/")}>
        <ArrowBackIcon />
      </IconButton>
      <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
        {todoListName}
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
