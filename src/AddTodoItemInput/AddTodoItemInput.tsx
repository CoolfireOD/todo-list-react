import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type AddTodoItemInputProps = {
  onInputChange: (value: string) => void;
  onTodoItemAdd: () => void;
  value: string;
};

const AddTodoItemInput: React.FC<AddTodoItemInputProps> = ({
  onInputChange,
  onTodoItemAdd,
  value,
}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onInputChange(event.target.value);
  }

  return (
    <Box
      sx={{
        display: "flex",
        columnGap: "1rem",
        alignItems: "flex-end",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "85%",
        }}
      >
        <TextField
          onKeyUp={(event) => {
            if (event.key === "Enter") onTodoItemAdd();
          }}
          label="Task name"
          variant="standard"
          inputProps={{ maxLength: 64 }}
          value={value}
          onChange={handleChange}
          sx={{
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          height: "30px",
          width: "5rem",
        }}
        onClick={onTodoItemAdd}
      >
        add
      </Button>
    </Box>
  );
};

export default AddTodoItemInput;
