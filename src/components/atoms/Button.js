import { Button as MaterialButton } from "@mui/material";
import styled from "styled-components";

const StyledButton = styled(MaterialButton)`
  color: ${(props) =>
    props.filled ? props.theme.palette.fifth : props.theme.palette.third};
  border: 1px solid ${(props) => props.theme.palette.first};
  background-color: ${(props) =>
    props.filled ? props.theme.palette.third : props.theme.palette.fifth};
  &:hover {
    color: ${(props) =>
      props.filled ? props.theme.palette.third : props.theme.palette.fifth};
    background-color: ${(props) =>
      props.filled ? props.theme.palette.fifth : props.theme.palette.third};
  }
`;

const Button = ({ children, ...rest }) => (
  <StyledButton {...rest}>{children}</StyledButton>
);

export default Button;
