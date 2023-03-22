import { React, useEffect, useState } from 'react';
import './App.css';
//React router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Components
import Navbar from './components/organisms/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Nopage from './components/pages/Nopage';
import AuthRoute from './components/AuthRoute';
import Notifications from './components/pages/Notifications';
import Profile from './components/pages/Profile';
import Lounge from './components/pages/Lounge';
import ThemeChanger from './components/pages/ThemeChanger';
import PhotoAlbum from './components/pages/PhotoAlbum';
//Actions
import { setUser } from './redux/userSlice';
import {
  loadBarks,
  loadLoves,
  loadComments,
  loadNotifications,
  loadCommentLoves,
} from './redux/barkSlice';

//Redux hooks
import { useDispatch, useSelector } from 'react-redux';
//Firestore
import {
  getSignedUserData,
  getBarksFireStore,
  getLovesFireStore,
  getCommentsFireStore,
  getNotificationsFireStore,
  getCommentLovesFireStore,
} from './firebase/firebase';
//Styled components
import { ThemeProvider } from 'styled-components';
//Selectors
import { selectTheme } from './redux/selectors';

const tokenStorage = sessionStorage.getItem('token');
const uid = sessionStorage.getItem('uid');

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => selectTheme(state));

  const [authenticated, setAuthenticated] = useState(Boolean(tokenStorage));
  const [token, setToken] = useState(tokenStorage);

  useEffect(() => {
    if (authenticated) {
      getSignedUserData(uid).then((userData) =>
        userData.forEach((user) => dispatch(setUser(user.data()))),
      );
      getBarksFireStore().then((data) => dispatch(loadBarks(data)));
      getLovesFireStore().then((data) => dispatch(loadLoves(data)));
      getCommentsFireStore().then((data) => dispatch(loadComments(data)));
      getNotificationsFireStore().then((data) =>
        dispatch(loadNotifications(data)),
      );
      getCommentLovesFireStore().then((data) =>
        dispatch(loadCommentLoves(data)),
      );
    }
  }, [authenticated, token, dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <AuthRoute
                exact
                path="/"
                authenticated={authenticated}
                component={Home}
              />
              <AuthRoute
                path="/notifications"
                authenticated={authenticated}
                component={Notifications}
              />
              <AuthRoute
                path="/account"
                authenticated={authenticated}
                component={Profile}
              />
              <AuthRoute
                exact
                path="/lounge"
                authenticated={authenticated}
                component={Lounge}
              />
              <AuthRoute
                path="/lounge/theme_changer"
                authenticated={authenticated}
                component={ThemeChanger}
              />
              <AuthRoute
                path="/lounge/photo_album"
                authenticated={authenticated}
                component={PhotoAlbum}
              />
              <Route
                path="/login"
                render={(props) => (
                  <Login
                    {...props}
                    setAuthenticated={setAuthenticated}
                    setToken={setToken}
                  />
                )}
              />
              <Route path="/register" component={Register} />
              <Route path="*" component={Nopage} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
