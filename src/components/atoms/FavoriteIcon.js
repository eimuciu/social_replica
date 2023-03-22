//MUI icons
import FavoriteBorderMaterial from "@mui/icons-material/FavoriteBorder";
import FavoriteMaterial from "@mui/icons-material/Favorite";
//Styled components
import styled from "styled-components";

export const Favorite = styled(FavoriteMaterial)`
  color: ${(props) => props.theme.palette.second};
  &:hover {
    transform: scale(1.1);
  }
`;

export const FavoriteBorder = styled(FavoriteBorderMaterial)`
  color: ${(props) => props.theme.palette.third};
  &:hover {
    transform: scale(1.1);
  }
`;
