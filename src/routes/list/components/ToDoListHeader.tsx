import React from "react";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import { IconButton, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToDoListHeaderTitle } from "./ToDoListHeaderTitle";
import { useNotifications } from "../../../components/NotificationsProvider";

const ToDoListHeader: React.FC = () => {
  const navigate = useNavigate();
  const { push } = useNotifications();

  function handleClick() {
    push({
      message: "URL is copied to clipboard!",
      type: "success",
      horizontal: "right",
      delay: 3000,
    });
    navigator.clipboard.writeText(window.location.href);
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
      <React.Suspense
        fallback={
          <Skeleton
            width={140}
            variant="text"
            sx={{ fontSize: "2.125rem", fontWeight: 700, lineHeight: "1.235" }}
          />
        }
      >
        <ToDoListHeaderTitle />
      </React.Suspense>
      <IconButton onClick={handleClick}>
        <InsertLinkIcon sx={{ rotate: "-45deg" }} />
      </IconButton>
    </Box>
  );
};

export default ToDoListHeader;
