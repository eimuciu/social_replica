import { React, useState } from 'react';
//Components
import BarkCardModal from '../molecules/bark_card/BarkCardModal';
//MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearAll from '@mui/icons-material/ClearAll';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
//Styled components
import styled from 'styled-components';
//Redux hooks
import { useSelector, useDispatch } from 'react-redux';
//Actions
import {
  clearNotifications,
  markNotificationAsRead,
} from '../../redux/barkActions';
//Selectors
import {
  selectNotificationsByUserName,
  selectNumberOfUnReadNotifications,
} from '../../redux/selectors';

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.palette.first};
  text-decoration: none !important;
  cursor: pointer;
`;

const StyledTypography = styled(Typography)`
  color: ${(props) => props.theme.palette.first};
  background-color: ${(props) =>
    props.isRead ? props.theme.palette.fifth : props.theme.palette.third};
  margin: 5px !important;
  border-radius: 2px;
  padding: 10px;
  &:hover {
    background-color: ${(props) => props.theme.palette.second};
  }
`;

const useStyles = makeStyles((theme) => ({
  avatar: { width: '80px', height: '80px' },
  collapse: { position: 'relative' },
  buttonStyles: { position: 'absolute', right: '0', top: '0px' },
}));

const Notifications = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { barks } = useSelector((state) => state.bark);

  const notificationsByUserName = useSelector((state) =>
    selectNotificationsByUserName(state),
  );

  const numberOfUnReadNotifications = useSelector((state) =>
    selectNumberOfUnReadNotifications(state),
  );

  const [expanded, setExpanded] = useState(true);

  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState();

  const onClose = () => {
    setOpen(!open);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onClearNotifications = () => {
    dispatch(clearNotifications(notificationsByUserName));
  };

  const findBarkById = (barks, barkId) =>
    barks.find((item) => item.id === barkId);

  return (
    <Card style={{ boxShadow: 'none' }}>
      <CardContent>
        <Typography variant="h4" style={{ paddingBottom: '20px' }}>
          Notifications
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          style={{ paddingBottom: '10px' }}
        >
          <Grid item md={8} sm={8} xs={8}>
            <Typography paragraph>
              You have {numberOfUnReadNotifications} new notifications
            </Typography>
          </Grid>
          <Grid item md={2} sm={2} xs={2}>
            <IconButton onClick={handleExpandClick}>
              <ExpandMoreIcon />
            </IconButton>
            <IconButton onClick={onClearNotifications}>
              <ClearAll />
            </IconButton>
          </Grid>
        </Grid>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          className={classes.collapse}
        >
          {notificationsByUserName.map((item) => (
            <>
              <StyledLink
                key={item.id}
                onClick={() => {
                  setOpen(true);
                  setItemId(item.barkId);
                  dispatch(markNotificationAsRead(item));
                }}
              >
                <StyledTypography paragraph isRead={item.isRead}>
                  {item.type === 'commentLike' &&
                    item.userHandle + ' liked your comment'}
                  {item.type === 'like' && item.userHandle + ' liked your bark'}
                  {item.type === 'comment' &&
                    item.userHandle + ' made a comment'}
                </StyledTypography>
              </StyledLink>
            </>
          ))}
        </Collapse>
      </CardContent>
      <BarkCardModal
        open={open}
        onClose={onClose}
        bark={findBarkById(barks, itemId)}
      />
    </Card>
  );
};

export default Notifications;
