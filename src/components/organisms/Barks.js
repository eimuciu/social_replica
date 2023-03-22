import { React } from "react";
//MUI
import Typography from "@mui/material/Typography";
//Components
import PostBark from "../molecules/bark_card/PostBark";
import BarkCard from "../molecules/bark_card/BarkCard";
//Redux hooks
import { useSelector } from "react-redux";
//Selectors
import { selectBarksByDate } from "../../redux/selectors";

const Barks = () => {
  const barksByDate = useSelector((state) => selectBarksByDate(state));

  return (
    <>
      <PostBark />
      <Typography variant="h4" style={{ paddingBottom: "20px" }}>
        Shouts feed...
      </Typography>
      {barksByDate.map((item) => (
        <BarkCard key={item.id} bark={item} />
      ))}
    </>
  );
};

export default Barks;
