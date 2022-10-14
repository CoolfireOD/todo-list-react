import React from "react";
import "./ToDoItem.css";
import classNames from "classnames";
import Checkbox from "@mui/material/Checkbox";
import { CustomButtonGray } from "../customElements";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    info: grey,
  },
});

interface ToDoItemProps {
  description: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onClick: () => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  description,
  completed,
  onToggle,
  onDelete,
  onClick,
}) => {
  const classes = classNames("todo-item__description", {
    _completed: completed,
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="todo-item">
        <p onClick={onClick} className={classes}>
          {description}
        </p>
        <Checkbox
          color="info"
          className="todo-item__input"
          checked={completed}
          onChange={onToggle}
        />
        <CustomButtonGray
          variant="contained"
          className="todo-item__delete-btn"
          onClick={() => {
            setTimeout(onDelete, 100);
          }}
        >
          del
        </CustomButtonGray>
      </div>
    </ThemeProvider>
  );
};

export default ToDoItem;
