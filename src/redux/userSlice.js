import { createSlice } from "@reduxjs/toolkit";

const state = {
  credentials: {
    id: undefined,
    user: "",
    password: "",
    userName: "",
    posts: [],
  },
  authenticated: false,
  showProfile: true,
  showNotifications: false,
  errors: {},
  theme: {
    palette: {
      first: "#1B1B1E",
      second: "#EE6123",
      third: "#4F759B",
      fourth: "#99C24D",
      fifth: "#EFE9F4",
    },
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: state,
  reducers: {
    changeTheme: (state, action) => ({
      ...state,
      theme: { palette: { ...state.theme.palette, ...action.payload } },
    }),
    setUser: (state, action) => ({
      ...state,
      credentials: { ...action.payload },
      authenticated: true,
    }),
    unSetUser: (state, action) => ({
      ...state,
      credentials: {},
      authenticated: false,
    }),
    updateDetails: (state, action) => ({
      ...state,
      credentials: { ...state.credentials, ...action.payload },
    }),
    showProfilePage: (state, action) => ({
      ...state,
      showProfile: true,
      showNotifications: false,
    }),
    showNotificationsPage: (state, action) => ({
      ...state,
      showNotifications: true,
      showProfile: false,
    }),
    setUserErrors: (state, action) => ({
      ...state,
      errors: action.payload,
    }),
  },
});

export const {
  setUser,
  unSetUser,
  showProfilePage,
  showNotificationsPage,
  updateDetails,
  changeTheme,
  setUserErrors,
} = userSlice.actions;

export default userSlice.reducer;
