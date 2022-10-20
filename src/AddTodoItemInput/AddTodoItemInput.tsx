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
        columnGap: 2,
        alignItems: "flex-end",
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
            fullWidth
        />
      <Button
        variant="contained"
        onClick={onTodoItemAdd}
      >
        add
      </Button>
    </Box>
  );
};

export default AddTodoItemInput;
