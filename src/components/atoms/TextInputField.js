import { forwardRef } from "react";
//MUI components
import TextFieldMaterial from "@mui/material/TextField";
//Styled components
import styled from "styled-components";

const TextField = styled(TextFieldMaterial)`
  & label.Mui-focused {
    color: ${(props) => props.theme.palette.third};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${(props) => props.theme.palette.third};
    }
  }
`;

const TextInputField = forwardRef(({ ...rest }, ref) => (
  <TextField ref={ref} {...rest} />
));

export default TextInputField;
