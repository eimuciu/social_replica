import { setUser, unSetUser, updateDetails, setUserErrors } from './userSlice';
import { updateContentWithUserDetails } from './barkSlice';
//FIREBASE
import {
  signUpFireStore,
  signInFireStore,
  getSignedUserData,
  updateUserDetailsFireStore,
  updateContentWithUserDetailsFireStore,
} from '../firebase/firebase';

export const registerUser = (userDetails, history) => (dispatch, getState) => {
  dispatch(setUserErrors({}));
  signUpFireStore(userDetails)
    .then(() => history.push('/login'))
    .catch((err) => {
      console.error(err.message);
      dispatch(setUserErrors({ registrationError: err.message }));
    });
};

export const loginUser =
  (email, password, history, setAuthenticated, setToken) =>
  (dispatch, getState) => {
    dispatch(setUserErrors({}));
    signInFireStore(email, password)
      .then((data) => {
        data.user.getIdToken().then((token) => {
          setToken(token);
          sessionStorage.setItem('token', token);
        });
        getSignedUserData(data.user.uid).then((userData) =>
          userData.forEach((user) => {
            sessionStorage.setItem('uid', user.data().uid);
            dispatch(setUser({ ...user.data(), id: user.id }));
          }),
        );
        setAuthenticated(true);
        history.push('/');
      })
      .catch((err) =>
        dispatch(
          setUserErrors({
            loginError: 'User do not exist or password is incorrect',
          }),
        ),
      );
  };

export const logOutUser = (history) => (dispatch, useState) => {
  sessionStorage.clear();
  dispatch(unSetUser());
  history.push('/login');
};

export const updateUserDetails = (userCredentials) => (dispatch, useState) => {
  sessionStorage.setItem('user', userCredentials.newCredentials.userName);
  dispatch(updateDetails(userCredentials.newCredentials));
  dispatch(updateContentWithUserDetails(userCredentials));
  updateUserDetailsFireStore(userCredentials.newCredentials);
  updateContentWithUserDetailsFireStore(userCredentials);
};
