import React from "react";
//MUI
import Grid from "@mui/material/Grid";
import { Card as CardMaterial } from "@mui/material/";
//Styled components
import styled from "styled-components";
//Components
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";
import Barks from "../organisms/Barks";
import LoungePanel from "../organisms/LoungePanel";
//Custom hooks
import { useWindowSize } from "../../customHooks/useWindowSize";

const MobileScreen = () => (
  <Grid container style={{ padding: "20px" }} spacing={2} justify="center">
    <Grid item xs={12} sm={12} md={7}>
      <Barks />
    </Grid>
  </Grid>
);

const DesktopScreen = () => (
  <Grid container style={{ padding: "20px" }} spacing={2} justify="center">
    <Grid item xs={12} sm={12} md={2}>
      <LoungePanel />
    </Grid>
    <Grid item xs={12} sm={12} md={7}>
      <Barks />
    </Grid>
    <Grid item xs={12} sm={12} md={3}>
      <Card>
        <Grid container direction="row" style={{ width: "100%" }}>
          <Grid item md={12} style={{ padding: "10px" }}>
            <Profile />
          </Grid>
          <Grid item md={12} style={{ padding: "10px" }}>
            <Notifications />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  </Grid>
);

const Home = () => {
  const isMobileScreen = useWindowSize().width < 960;

  return <>{isMobileScreen ? <MobileScreen /> : <DesktopScreen />}</>;
};

export default Home;

const Card = styled(CardMaterial)`
  box-shadow: none;
  height: 80vh;
  position: fixed;
  width: 24%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.palette.third};
    border-radius: 5px;
  }
`;
