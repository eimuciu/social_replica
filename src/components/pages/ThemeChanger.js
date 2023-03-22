//MUI components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardMaterial from "@mui/material/Card";
//Styled components
import styled from "styled-components";
//Theme
import { themeData, themeDataForRedux } from "../Theme";
//Redux hooks
import { useDispatch } from "react-redux";
//User actions
import { changeTheme } from "../../redux/userSlice";

const data = Object.values(themeData).map((item, indx) => ({
  ...item,
  text: `Theme ${indx + 1}`,
}));

const Card = styled(CardMaterial)`
  position: relative;
  cursor: pointer;
  &:hover {
    top: -5px;
  }
`;

const LoungeLinksCard = ({ theme }) => {
  const { text, colors } = theme;
  return (
    <Card>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={1}
        style={{ paddingBottom: "30px" }}
      >
        <Grid item>
          <Typography variant="h4">{text}</Typography>
        </Grid>
        {colors.map((item) => (
          <Grid
            item
            style={{ backgroundColor: item, height: "30px", width: "80%" }}
          ></Grid>
        ))}
      </Grid>
    </Card>
  );
};

const ThemeChanger = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Typography
        variant="h2"
        style={{ paddingBottom: "20px", textAlign: "center" }}
      >
        Theme changer
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {data.map((item, indx) => (
          <Grid
            item
            xs={11}
            sm={11}
            md={5}
            onClick={() => {
              dispatch(changeTheme(themeDataForRedux[`theme${indx + 1}`]));
            }}
          >
            <LoungeLinksCard theme={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ThemeChanger;

const MiniLoungeLinksCard = ({ theme }) => {
  const { colors } = theme;
  return (
    <Container>
      {colors.map((item) => (
        <Grid
          item
          style={{
            backgroundColor: item,
            height: "30px",
            width: "90%",
          }}
        ></Grid>
      ))}
    </Container>
  );
};

const Container = styled(Grid).attrs((props) => ({
  container: true,
  direction: "column",
  alignItems: "center",
}))`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 5px 0 5px 0;
  position: relative;
  cursor: pointer;
  &:hover {
    top: -2px;
  }
`;

export const MiniThemeChangerVersion = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Grid container spacing={2} justify="center">
        {data.map((x, indx) => (
          <Grid
            item
            md={10}
            onClick={() => {
              dispatch(changeTheme(themeDataForRedux[`theme${indx + 1}`]));
            }}
          >
            <MiniLoungeLinksCard theme={x} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
