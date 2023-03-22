import { React, useState, useEffect } from "react";
//Components
import EditTextDialog from "./EditTextDialog";
import OptionsDropDown from "./OptionsDropDown";
import LoveButton from "../../atoms/LoveButton";
//MUI
import { Avatar as MaterialAvatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
//Actions
import {
  updateComment,
  removeSingleComment,
  removeNotification,
  addCommentLove,
  loveCountChanger,
  removeCommentLove,
  addNotification,
} from "../../../redux/barkActions";
//Redux hooks
import { useDispatch, useSelector } from "react-redux";
//Time ago
import ReactTimeAgo from "react-time-ago";
//Styled components
import styled from "styled-components";
import { selectNotifications } from "../../../redux/selectors";

const Avatar = styled(MaterialAvatar)``;

const AvatarContainer = styled(Grid)`
  align-self: flex-start;
  display: flex;
  justify-content: flex-end;
  padding-right: 1px;
`;

const MainContainer = styled(Grid)`
  box-sizing: border-box;
  padding: 5px;
`;

const CommentContainer = styled(Grid)`
  background-color: ${(props) => props.theme.palette.fourth};
  border-radius: 5px;
  padding: 10px;
`;

const NickNameContainer = styled(Grid)`
  align-self: flex-start;
  color: ${(props) => props.theme.palette.third};
`;

const CommentBodyContainer = styled(Grid)`
  padding-top: 10px;
`;

const LoveButtonContainer = styled(Grid)`
  align-self: flex-end;
`;

const Comment = ({ comment }) => {
  const {
    avatar,
    commentBody,
    profilePicture,
    userHandle,
    id,
    loveCount,
    barkId,
  } = comment;
  const dispatch = useDispatch();

  const userLoggedIn = useSelector((state) => state.user.credentials.userName);
  const notifications = useSelector((state) => selectNotifications(state));
  const commentLoves = useSelector((state) => state.bark.commentLoves);

  const [isEditComment, setIsEditComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setCommentText(commentBody);
  }, [commentBody]);

  const onClose = () => {
    setIsEditComment(false);
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const updateCommentDetails = () => {
    dispatch(updateComment({ ...comment, commentBody: commentText }));
  };

  //Comment Drop Menu actions

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const findDeletedCommentNotification = notifications.find(
    (item) => item.commentBody === commentBody
  );

  const handleDelete = () => {
    dispatch(removeSingleComment(comment));
    dispatch(removeNotification(findDeletedCommentNotification));
  };

  const handleEdit = () => {
    setIsEditComment(!isEditComment);
    handleClose();
  };

  //Love actions

  const isLoved = () => {
    if (findIfLoved) {
      return true;
    } else {
      return false;
    }
  };

  const findIfLoved = commentLoves.find(
    (x) => x.userHandle === userLoggedIn && x.commentId === id
  );

  const changeLoveValue = (value, obj) => {
    let objCopy = { ...obj };
    objCopy.loveCount = parseInt(objCopy.loveCount) + value;
    return objCopy;
  };

  const findUnlikedNotification = notifications.find(
    (item) =>
      item.commentId === id &&
      item.type === "commentLike" &&
      item.userHandle === userLoggedIn
  );

  const handleLove = () => {
    if (findIfLoved) {
      dispatch(removeCommentLove(findIfLoved));
      dispatch(
        loveCountChanger({
          type: "comments",
          data: changeLoveValue(-1, comment),
        })
      );
      dispatch(removeNotification(findUnlikedNotification));
    } else {
      dispatch(addCommentLove({ commentId: id, userHandle: userLoggedIn }));
      dispatch(
        loveCountChanger({
          type: "comments",
          data: changeLoveValue(+1, comment),
        })
      );
      if (userLoggedIn !== userHandle) {
        dispatch(
          addNotification({
            barkId: barkId,
            commentId: id,
            userHandle: userLoggedIn,
            userTo: userHandle,
            type: "commentLike",
            isRead: false,
          })
        );
      }
    }
  };

  return (
    <>
      <MainContainer container justify="center" alignItems="center">
        <AvatarContainer item xs={1} sm={1} md={1}>
          <Avatar src={avatar} />
        </AvatarContainer>

        {/* COMMENT */}

        <CommentContainer
          container
          direction="column"
          // align="center"
          item
          xs={9}
          sm={10}
          md={10}
        >
          <NickNameContainer>
            <Typography variant="caption">
              {comment.userHandle} @{" "}
              <ReactTimeAgo date={comment.createdAt} locale="en-US" />
            </Typography>
          </NickNameContainer>
          <CommentBodyContainer>
            <Typography paragpraph>{commentBody}</Typography>
          </CommentBodyContainer>
          <LoveButtonContainer>
            <LoveButton
              onClick={handleLove}
              isLoved={isLoved()}
              loveCount={loveCount}
            />
          </LoveButtonContainer>
        </CommentContainer>

        {/* DROP MENU  */}

        <Grid item xs={1} sm={1} md={1}>
          {userHandle === userLoggedIn && (
            <OptionsDropDown
              handleClick={handleClick}
              handleClose={handleClose}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              anchorEl={anchorEl}
            />
          )}
        </Grid>
      </MainContainer>

      {isEditComment && (
        <EditTextDialog
          isOpen={isEditComment}
          profilePicture={profilePicture}
          credentials={comment}
          textBody={commentText}
          handleChange={handleCommentChange}
          updateDetails={updateCommentDetails}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default Comment;
