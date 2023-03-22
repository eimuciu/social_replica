import { React, useState, useEffect } from "react";
//MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { TextField as TextFieldForStyling } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
// Styled components
import styled from "styled-components";
//Redux hooks
import { useDispatch } from "react-redux";
//Actions
import { updateUserDetails } from "../../redux/userActions";

const UserDetailsForm = ({ open, handleClose, userCredentials }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState({
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
    avatarLink: "",
  });

  useEffect(() => {
    setText((text) => ({
      ...text,
      userName: userCredentials.userName,
      email: userCredentials.user,
      password: userCredentials.password,
      repeatPassword: userCredentials.password,
      avatarLink: userCredentials.profilePicture,
    }));
  }, [
    userCredentials.userName,
    userCredentials.user,
    userCredentials.password,
    userCredentials.profilePicture,
  ]);

  const handleChange = (event) => {
    setText({ ...text, [event.target.name]: event.target.value });
  };

  const submitUserDetails = () => {
    const newCredentials = {
      ...userCredentials,
      userName: text.userName,
      user: text.email,
      password: text.password,
      profilePicture: text.avatarLink,
    };
    if (text.password === text.repeatPassword) {
      dispatch(
        updateUserDetails({
          oldCredentials: userCredentials,
          newCredentials: newCredentials,
        })
      );
    }
  };

  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update your details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="User Name"
            name="userName"
            type="text"
            value={text.userName}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            disabled
            label="Email Address"
            name="email"
            type="email"
            fullWidth
            value={text.email}
            onChange={handleChange}
          />
          <TextField
            disabled
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={text.password}
            onChange={handleChange}
          />
          <TextField
            disabled
            label="Repeat password"
            name="repeatPassword"
            type="password"
            fullWidth
            value={text.repeatPassword}
            onChange={handleChange}
          />
          <TextField
            label="Avatar Link"
            name="avatarLink"
            type="text"
            fullWidth
            value={text.avatarLink}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setText({
                userName: userCredentials.userName,
                email: userCredentials.user,
              });
              handleClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              submitUserDetails();
              handleClose();
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDetailsForm;

const TextField = styled(TextFieldForStyling)`
  margin-top: 15px !important;
`;
