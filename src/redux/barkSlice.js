import { createSlice } from "@reduxjs/toolkit";

const state = {
  barks: [],
  loves: [],
  comments: [],
  notifications: [],
  commentLoves: [],
};

const barkSlice = createSlice({
  name: "bark",
  initialState: state,
  reducers: {
    loadBarks: (state, action) => ({ ...state, barks: [...action.payload] }),
    setBarks: (state, action) => ({
      ...state,
      barks: [action.payload, ...state.barks],
    }),
    updateBarkStore: (state, action) => ({
      ...state,
      barks: state.barks.map((item) =>
        item.id === action.payload.id ? action.payload : item
      ),
    }),
    loadLoves: (state, action) => ({
      ...state,
      loves: action.payload,
    }),
    setLoves: (state, action) => ({
      ...state,
      loves: [...state.loves, action.payload],
    }),
    removeLove: (state, action) => ({
      ...state,
      loves: state.loves.filter(
        (item) => item.id !== action.payload.id && item
      ),
    }),
    changeLoveCount: (state, action) => {
      const { type, data } = action.payload;
      return {
        ...state,
        [type]: state[type].map((item) => (item.id === data.id ? data : item)),
      };
    },
    loadComments: (state, action) => ({
      ...state,
      comments: action.payload,
    }),
    setComments: (state, action) => ({
      ...state,
      comments: [action.payload, ...state.comments],
    }),
    updateComments: (state, action) => ({
      ...state,
      comments: state.comments.map((item) =>
        item.id === action.payload.id ? action.payload : item
      ),
    }),
    deleteSingleComment: (state, action) => ({
      ...state,
      comments: state.comments.filter(
        (item) => item.id !== action.payload.id && item
      ),
    }),
    loadNotifications: (state, action) => ({
      ...state,
      notifications: action.payload,
    }),
    setNotifications: (state, action) => ({
      ...state,
      notifications: [action.payload, ...state.notifications],
    }),
    takeNotificationOffTheList: (state, action) => {
      if (action.payload === undefined) {
        return state;
      } else {
        return {
          ...state,
          notifications: state.notifications.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      }
    },
    clearAllNotifications: (state, action) => ({
      ...state,
      notifications: state.notifications.map((item) =>
        item.userTo === action.payload ? { ...item, isRead: true } : item
      ),
    }),
    deleteAllNotifications: (state, action) => ({
      ...state,
      notifications: state.notifications.filter(
        (item) => item.barkId !== action.payload
      ),
    }),
    markNotificationAsReadInStore: (state, action) => ({
      ...state,
      notifications: state.notifications.map((item) =>
        item.id === action.payload.id ? { ...item, isRead: true } : item
      ),
    }),
    deleteBark: (state, action) => ({
      ...state,
      barks: state.barks.filter((item) => item.id !== action.payload),
    }),
    deleteComment: (state, action) => ({
      ...state,
      comments: state.comments.filter((item) => item.barkId !== action.payload),
    }),
    deleteAllLoves: (state, action) => ({
      ...state,
      loves: state.loves.filter((item) => item.barkId !== action.payload),
    }),
    updateContentWithUserDetails: (state, action) => {
      let updatedBarks = state.barks.map((item) =>
        item.userHandle === action.payload.oldCredentials.userName
          ? {
              ...item,
              profilePicture: action.payload.newCredentials.profilePicture,
              userHandle: action.payload.newCredentials.userName,
            }
          : item
      );
      let updatedComments = state.comments.map((item) =>
        item.userHandle === action.payload.oldCredentials.userName
          ? {
              ...item,
              avatar: action.payload.newCredentials.profilePicture,
              userHandle: action.payload.newCredentials.userName,
            }
          : item
      );
      let updatedNotifications = state.notifications.map((item) =>
        item.userHandle === action.payload.oldCredentials.userName &&
        item.userTo === action.payload.oldCredentials.userName
          ? {
              ...item,
              userHandle: action.payload.newCredentials.userName,
              userTo: action.payload.newCredentials.userName,
            }
          : item.userHandle === action.payload.oldCredentials.userName
          ? { ...item, userHandle: action.payload.newCredentials.userName }
          : item.userTo === action.payload.oldCredentials.userName
          ? { ...item, userTo: action.payload.newCredentials.userName }
          : item
      );
      let updatedLoves = state.loves.map((item) =>
        item.userHandle === action.payload.oldCredentials.userName
          ? { ...item, userHandle: action.payload.newCredentials.userName }
          : item
      );
      return {
        ...state,
        barks: updatedBarks,
        comments: updatedComments,
        notifications: updatedNotifications,
        loves: updatedLoves,
      };
    },
    //Comment Love actions
    loadCommentLoves: (state, action) => ({
      ...state,
      commentLoves: [...action.payload],
    }),
    addCommentLoveToStore: (state, action) => ({
      ...state,
      commentLoves: [...state.commentLoves, action.payload],
    }),
    removeCommentLoveStore: (state, action) => ({
      ...state,
      commentLoves: state.commentLoves.filter(
        (item) => item.id !== action.payload.id
      ),
    }),
    removeAllCommentLovesFromStore: (state, action) => {
      let yFilter = action.payload.map((x) => x.id);
      return {
        ...state,
        commentLoves: state.commentLoves.filter((x) => !yFilter.includes(x.id)),
      };
    },
  },
});

export const {
  setBarks,
  loadBarks,
  setLoves,
  loadLoves,
  changeLoveCount,
  removeLove,
  loadComments,
  setComments,
  loadNotifications,
  setNotifications,
  takeNotificationOffTheList,
  deleteBark,
  deleteComment,
  deleteAllLoves,
  updateBarkStore,
  updateComments,
  clearAllNotifications,
  deleteSingleComment,
  markNotificationAsReadInStore,
  deleteAllNotifications,
  updateContentWithUserDetails,
  addCommentLoveToStore,
  loadCommentLoves,
  removeCommentLoveStore,
  removeAllCommentLovesFromStore,
} = barkSlice.actions;

export default barkSlice.reducer;
