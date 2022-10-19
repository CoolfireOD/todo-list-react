import React from "react";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Box from "@mui/material/Box";
import {IconButton, Tooltip, Typography} from "@mui/material";

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
      <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
          My to-do list
      </Typography>
        {/*todo: use Snackbar for feedback*/}
        <Tooltip title="Copy URL">
            <IconButton>
                <InsertLinkIcon onClick={handleClick} sx={{ rotate: '-45deg' }}/>
            </IconButton>
        </Tooltip>
    </Box>
  );
};

export default ToDoListHeader;
