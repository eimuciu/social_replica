import React from 'react';
//React router
import { Link, useHistory } from 'react-router-dom';
//MUI
import AppBarMaterial from '@mui/material/AppBar';
import ToolbarMaterial from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
//MUI icons
import HomeMaterial from '@mui/icons-material/Home';
import ExitToAppIconMaterial from '@mui/icons-material/ExitToApp';
import AccountCircleMaterial from '@mui/icons-material/AccountCircle';
import NotificationsMaterial from '@mui/icons-material/Notifications';
import WbSunnyIconMaterial from '@mui/icons-material/WbSunny';
//Actions
import { logOutUser } from '../../redux/userActions';
//Redux hooks
import { useDispatch, useSelector } from 'react-redux';
//Styled components
import styled, { css } from 'styled-components';
//Selectors
import { selectNumberOfUnReadNotifications } from '../../redux/selectors';

const AppBar = styled(AppBarMaterial)`
  margin: 0 auto;
  background-color: ${(props) => props.theme.palette.first} !important;
`;

const Toolbar = styled(ToolbarMaterial)`
  margin: 0 auto;
  background-color: ${(props) => props.theme.palette.first};
`;

const iconsStyling = css`
  color: ${(props) => props.theme.palette.fifth};
  &:hover {
    color: ${(props) => props.theme.palette.second};
  }
`;

const Home = styled(HomeMaterial)`
  ${() => iconsStyling}
`;

const ExitToAppIcon = styled(ExitToAppIconMaterial)`
  ${() => iconsStyling}
`;

const AccountCircle = styled(AccountCircleMaterial)`
  ${() => iconsStyling}
`;

const Notifications = styled(NotificationsMaterial)`
  ${() => iconsStyling}
`;

const WbSunnyIcon = styled(WbSunnyIconMaterial)`
  ${() => iconsStyling}
`;

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.authenticated);
  const numberOfUnReadNotifications = useSelector((state) =>
    selectNumberOfUnReadNotifications(state),
  );

  return (
    <AppBar>
      <Toolbar>
        {authenticated ? (
          <>
            <Button color="inherit" component={Link} to="/">
              <Home />
            </Button>
            <Button color="inherit" component={Link} to="/lounge">
              <WbSunnyIcon />
            </Button>
            <Button component={Link} to="/notifications">
              {numberOfUnReadNotifications > 0 ? (
                <Badge
                  color="secondary"
                  badgeContent={numberOfUnReadNotifications}
                >
                  <Notifications />
                </Badge>
              ) : (
                <Notifications />
              )}
            </Button>

            <Button component={Link} to="/account">
              <AccountCircle />
            </Button>
            <Button onClick={() => dispatch(logOutUser(history))}>
              <ExitToAppIcon />
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
