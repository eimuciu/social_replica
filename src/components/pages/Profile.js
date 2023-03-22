import { React, useState } from "react";
//Components
import UserDetailsForm from "../molecules/UserDetailsForm";
//MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
//Redux hooks
import { useSelector } from "react-redux";
//Selectors
import { selectUserCredentials } from "../../redux/selectors";

const useStyles = makeStyles((theme) => ({
  root: { position: "relative" },
  profilePicture: {
    height: "160px",
    width: "160px",
    margin: "0 auto",
  },
  text: {
    textAlign: "center",
    margin: "0px 0px 5px 0px",
  },
  icon: {
    position: "absolute",
    left: "0",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const userCredentials = useSelector((state) => selectUserCredentials(state));
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card className={classes.root} style={{ boxShadow: "none" }}>
        <IconButton className={classes.icon} onClick={handleClickOpen}>
          <Edit />
        </IconButton>
        <Avatar
          alt="profile_picture"
          src={userCredentials.profilePicture}
          className={classes.profilePicture}
        />
        <CardContent>
          <Typography paragraph className={classes.text}>
            {userCredentials.userName}
          </Typography>
          <Typography paragraph className={classes.text}>
            {userCredentials.user}
          </Typography>
        </CardContent>
      </Card>
      <UserDetailsForm
        open={open}
        handleClose={handleClose}
        userCredentials={userCredentials}
      />
    </>
  );
};

export default Profile;
