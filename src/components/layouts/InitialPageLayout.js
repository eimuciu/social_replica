import { React } from "react";
import { Link } from "react-router-dom";
// MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@mui/styles";
//Files
import logoImage from "../../images/logo.jpg";
//Components
import Button from "../atoms/Button";

const useStyles = makeStyles({
  logoImage: {
    height: 150,
    width: 150,
    objectFit: "contain",
    margin: "0 auto",
  },
});

const InitialPageLayout = ({
  mainText,
  children,
  onButtonClick,
  buttonText,
  loginPage,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item md={6} sm={10} xs={10}>
          <CardMedia image={logoImage} className={classes.logoImage} />
          <Typography
            variant="h3"
            align="center"
            style={{ paddingBottom: "20px" }}
          >
            {mainText}
          </Typography>
          <form>{children}</form>
          <Button variant="outlined" onClick={onButtonClick}>
            {buttonText}
          </Button>
          {loginPage && (
            <Typography align="center">
              If you are not registered click <Link to="/register">here</Link>
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default InitialPageLayout;
