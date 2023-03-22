import { React, useState, useEffect } from 'react';
//Components
import OptionsDropDown from './OptionsDropDown';
import EditTextDialog from './EditTextDialog';
import Comment from './Comment';
import PostCommentActionPanel from './PostCommentActionPanel';
import TextInputField from '../../atoms/TextInputField';
//MUI
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
//Styled components
import styled from 'styled-components';
//Redux hooks
import { useSelector, useDispatch } from 'react-redux';
//Actions
import {
  addLove,
  unLove,
  loveCountChanger,
  addComment,
  addNotification,
  removeNotification,
  removeBarkCard,
  removeCommentsOnBarkDelete,
  removeAllLoves,
  updateBark,
  removeAllNotifications,
  removeAllCommentLoves,
} from '../../../redux/barkActions';
//Time ago
import ReactTimeAgo from 'react-time-ago';
//Selectors
import {
  selectUserCredentials,
  selectLikedNotificationByBarkId,
  selectAllNotificationsByBarkId,
  selectAllCommentsByBarkId,
  selectAllLovesByBarkId,
  selectAllCommentLovesByBarkId,
  selectBarkUserLoved,
} from '../../../redux/selectors';

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0px auto 20px auto',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    position: 'relative',
    padding: '20px 0 20px 0',
  },
  cardContentStyles: {
    padding: '10px',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  cardHeaderStyles: {
    padding: '5px',
  },
  barkBodyStyles: { textAlign: 'center' },
  cardActionsStyles: { justifyContent: 'center' },
});

const BarkCard = ({ bark }) => {
  //PROPS
  const {
    profilePicture,
    userHandle,
    barkBody,
    loveCount,
    id,
    createdAt,
    postImage,
  } = bark;
  //MUI
  const classes = useStyles();
  //REDUX STORE HOOKS
  const dispatch = useDispatch();
  //SELECTORS
  const userCredentials = useSelector((state) => selectUserCredentials(state));
  const likedNotificationByBarkId = useSelector((state) =>
    selectLikedNotificationByBarkId(state, id),
  );
  const allNotificationsByBarkId = useSelector((state) =>
    selectAllNotificationsByBarkId(state, id),
  );
  const allCommentsByBarkId = useSelector((state) =>
    selectAllCommentsByBarkId(state, id),
  );
  const allLovesByBarkId = useSelector((state) =>
    selectAllLovesByBarkId(state, id),
  );
  const allCommentLovesByBarkId = useSelector((state) =>
    selectAllCommentLovesByBarkId(state, id),
  );
  const barkUserLoved = useSelector((state) => selectBarkUserLoved(state, id));

  //STATE
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState('');
  const [editBark, setEditBark] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setEditBark(bark.barkBody);
  }, [bark.barkBody]);

  //HANDLE LOVE
  const changeLoveValue = (value, obj) => {
    let objCopy = { ...obj };
    objCopy.loveCount = parseInt(objCopy.loveCount) + value;
    return objCopy;
  };

  const handleLove = () => {
    if (barkUserLoved) {
      dispatch(unLove(barkUserLoved));
      dispatch(
        loveCountChanger({ type: 'barks', data: changeLoveValue(-1, bark) }),
      );
      dispatch(removeNotification(likedNotificationByBarkId));
    } else {
      dispatch(addLove({ barkId: id, userHandle: userCredentials.userName }));
      dispatch(
        loveCountChanger({ type: 'barks', data: changeLoveValue(+1, bark) }),
      );
      if (userCredentials.userName !== userHandle) {
        dispatch(
          addNotification({
            barkId: id,
            userHandle: userCredentials.userName,
            userTo: userHandle,
            type: 'like',
            isRead: false,
          }),
        );
      }
    }
  };

  //HANDLE COMMENTS
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const sendComment = () => {
    dispatch(
      addComment({
        loveCount: 0,
        userHandle: userCredentials.userName,
        user: userHandle,
        barkId: id,
        commentBody: comment,
        createdAt: new Date(),
        avatar: userCredentials.profilePicture,
      }),
    );
    if (userCredentials.userName !== userHandle) {
      dispatch(
        addNotification({
          barkId: id,
          userHandle: userCredentials.userName,
          userTo: userHandle,
          type: 'comment',
          commentBody: comment,
          isRead: false,
        }),
      );
    }
    setComment('');
  };

  // BarkDropMenu Actions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBarkDelete = () => {
    dispatch(removeBarkCard(id));
    dispatch(removeAllLoves({ id, filteredLoves: allLovesByBarkId }));
    dispatch(
      removeAllCommentLoves({
        id,
        filteredLoves: allCommentLovesByBarkId,
      }),
    );
    dispatch(
      removeCommentsOnBarkDelete({
        id,
        commentsById: allCommentsByBarkId,
      }),
    );
    dispatch(
      removeAllNotifications({
        id,
        filteredNotifications: allNotificationsByBarkId,
      }),
    );
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
    handleClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  // BarkEditDialog Actions
  const handleBarkChange = (event) => {
    setEditBark(event.target.value);
  };

  const updateBarkDetails = () => {
    dispatch(updateBark({ ...bark, barkBody: editBark }));
  };

  const onClose = () => {
    setIsEdit(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          className={classes.cardHeaderStyles}
          avatar={<Avatar src={profilePicture} />}
          action={
            userHandle === userCredentials.userName && (
              <OptionsDropDown
                handleClick={handleClick}
                handleClose={handleClose}
                handleDelete={handleBarkDelete}
                handleEdit={handleEdit}
                anchorEl={anchorEl}
              />
            )
          }
          title={userHandle}
          subheader={<ReactTimeAgo date={createdAt} locale="en-US" />}
        />

        <CardContent className={classes.cardContentStyles}>
          <Grid container direction="column">
            <Grid item style={{ paddingBottom: '10px' }}>
              <Typography
                className={classes.barkBodyStyles}
                style={{ textAlign: 'left' }}
              >
                {barkBody}
              </Typography>
            </Grid>
            <Grid item style={{ maxHeight: '400px', textAlign: 'center' }}>
              {postImage && <Image src={postImage} />}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          className={classes.cardActionsStyles}
          style={{ padding: '0px' }}
        >
          <PostCommentActionPanel
            isLoved={barkUserLoved}
            handleLove={handleLove}
            loveCount={loveCount}
            comment={comment}
            handleCommentChange={handleCommentChange}
            sendComment={sendComment}
            handleExpandClick={handleExpandClick}
            filterComments={allCommentsByBarkId}
          />
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {allCommentsByBarkId.map((item) => (
            <Comment key={item.id} comment={item} />
          ))}
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
            style={{
              padding: '10px',
            }}
          >
            <Grid item xs={7} sm={7} md={4}>
              <TextInputField
                style={{ padding: '0px' }}
                multiline
                size="small"
                name="comment"
                fullWidth
                value={comment}
                onChange={handleCommentChange}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={2}>
              <Paragraph onClick={sendComment}>Comment</Paragraph>
            </Grid>
          </Grid>
        </Collapse>
      </Card>
      {/* ***EDIT BARK BODY MODAL*** */}
      {isEdit && (
        <EditTextDialog
          isOpen={isEdit}
          profilePicture={profilePicture}
          credentials={bark}
          textBody={editBark}
          handleChange={handleBarkChange}
          updateDetails={updateBarkDetails}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default BarkCard;

const Paragraph = styled(Typography)`
  color: ${(props) => props.theme.palette.second};
  cursor: pointer;
  position: relative;
  &:hover {
    top: -1px;
  }
`;

const Image = styled.img`
  height: 100%;
`;
