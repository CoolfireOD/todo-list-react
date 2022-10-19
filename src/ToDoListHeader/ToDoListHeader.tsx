import React from "react";
import "./ToDoListHeader.css";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Box from "@mui/material/Box";

const ToDoListHeader: React.FC = () => {
  function handleClick() {
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
      <h2 className="header__title">My to-do list</h2>
      <InsertLinkIcon className="header__copy-link" onClick={handleClick} />
    </Box>
  );
};

export default ToDoListHeader;
