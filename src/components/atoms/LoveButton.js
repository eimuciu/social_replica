//MUI components
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
//Components
import { Favorite, FavoriteBorder } from "./FavoriteIcon";

const LoveButton = ({ onClick, isLoved, loveCount }) => {
  return (
    <>
      <IconButton onClick={onClick} style={{ padding: "0px 5px 0px 0px" }}>
        {isLoved ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
      <Typography paragraph style={{ display: "inline-block" }}>
        {parseInt(loveCount)}
      </Typography>
    </>
  );
};

export default LoveButton;
