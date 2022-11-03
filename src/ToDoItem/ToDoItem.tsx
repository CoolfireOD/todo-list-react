import React, { Children } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Typography, IconButton, Box, Paper, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Draggable } from "react-beautiful-dnd";
import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

interface ToDoItemProps {
  id: number;
  index: number;
  description: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({
  id,
  index,
  description,
  completed,
  onToggle,
  onDelete,
}) => {
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          elevation={snapshot.isDragging ? 12 : 1}
          sx={{
            px: 2,
            py: 0.5,
            mb: "12px",
            display: "flex",
            columnGap: 2,
            alignItems: "center",
            fontSize: "18px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: 1,
            }}
          >
            <Checkbox
              color="info"
              checked={completed}
              onChange={onToggle}
              sx={{
                height: "20px",
                width: "20px",
              }}
            />
            <Typography
              sx={{
                textAlign: "left",
                wordBreak: "break-word",
                position: "relative",
                textDecoration: completed ? "line-through" : "none",
              }}
            >
              {description}
            </Typography>
          </Box>
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Paper>
      )}
    </Draggable>
  );
};

export default ToDoItem;
