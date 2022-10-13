import { Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

export const CustomButtonGray = styled(Button)`
  background-color: rgb(138, 138, 138);
  border: 1px solid black;

  :hover {
    background-color: black;
  }
` as typeof Button;
