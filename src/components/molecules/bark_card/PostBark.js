import { React, useState } from "react";
//MUI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

//MUI Icons
import ImageIcon from "@mui/icons-material/Image";
//Actions
import { addBark } from "../../../redux/barkActions";
//Redux hooks
import { useSelector, useDispatch } from "react-redux";
//Components
import TextInputField from "../../atoms/TextInputField";
//Selectors
import { selectUserCredentials } from "../../../redux/selectors";
//Styled components
import styled from "styled-components";

const PostBark = () => {
  const userCredentials = useSelector((state) => selectUserCredentials(state));
  const dispatch = useDispatch();
  const [barkText, setBarkText] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [isImageLinkOpen, setIsImageLinkOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setErrors({});
    setBarkText(event.target.value);
  };

  const handleImageLinkChange = (event) => {
    setImageLink(event.target.value);
  };

  const formValidation = () => {
    const errors = {};
    if (!barkText) {
      errors.error = "Must not be empty";
    }
    if (Object.keys(errors).length === 0) {
      return false;
    } else {
      return errors;
    }
  };

  const postBark = () => {
    if (formValidation()) {
      setErrors(formValidation());
    } else {
      dispatch(
        addBark({
          userHandle: userCredentials.userName,
          barkBody: barkText,
          profilePicture: userCredentials.profilePicture,
          createdAt: new Date(),
          loveCount: "0",
          commentCount: "0",
          postImage: imageLink,
        })
      );
      setBarkText("");
      setImageLink("");
      setIsImageLinkOpen(false);
      setErrors({});
    }
  };

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={1}
        style={{ paddingBottom: "20px" }}
      >
        <Grid item md={2} xs={2} sm={2}>
          <Grid container justify="flex-end">
            <Avatar src={userCredentials.profilePicture} />
          </Grid>
        </Grid>
        <Grid item md={8} xs={7} sm={8}>
          <TextInputField
            multiline
            size="small"
            fullWidth
            onChange={handleChange}
            value={barkText}
            placeholder="shout your thoughts..."
            error={errors.error}
            helperText={errors.error}
          />
          {isImageLinkOpen ? (
            <TextInputField
              style={{ marginTop: "10px" }}
              size="small"
              fullWidth
              onChange={handleImageLinkChange}
              value={imageLink}
              placeholder="paste image link here..."
            />
          ) : null}
        </Grid>
        <Grid item md={2} xs={3} sm={2}>
          <Grid container alignItems="center">
            <Paragraph onClick={postBark}>Shout</Paragraph>
            <IconButton onClick={() => setIsImageLinkOpen(!isImageLinkOpen)}>
              <PostImageIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PostBark;

const Paragraph = styled(Typography)`
  color: ${(props) => props.theme.palette.third};
  background-color: ${(props) => props.theme.palette.fifth};
  border-radius: 5px;
  padding: 2px;
  cursor: pointer;
  position: relative;
  &:hover {
    top: -1px;
  }
`;

const PostImageIcon = styled(ImageIcon)`
  color: ${(props) => props.theme.palette.third};
`;
