import {
  setBarks,
  setLoves,
  changeLoveCount,
  removeLove,
  setComments,
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
  addCommentLoveToStore,
  removeCommentLoveStore,
  removeAllCommentLovesFromStore,
} from "../redux/barkSlice";
//FIREBASE
import {
  addBarkFireStore,
  updateBarkFireStore,
  addLoveFireStore,
  loveCountChangerFireStore,
  removeLoveFireStore,
  removeBarkFireStore,
  removeAllLovesFireStore,
  postCommentFireStore,
  postUpdateCommentFireStore,
  deleteAllCommentCardsFireStore,
  postNotificationFireStore,
  deleteNotificationFireStore,
  clearNotificationsFireStore,
  removeSingleCommentFireStore,
  markNotificationAsReadFireStore,
  removeAllNotificationsFireStore,
  addCommentLoveFireStore,
  removeCommentLoveFireStore,
  removeAllCommentLovesFireStore,
} from "../firebase/firebase";

//Bark actions
export const addBark = (bark) => (dispatch, getState) => {
  addBarkFireStore(bark).then((data) =>
    dispatch(setBarks({ ...bark, id: data.id }))
  );
};

export const removeBarkCard = (id) => (dispatch, getState) => {
  dispatch(deleteBark(id));
  removeBarkFireStore(id);
};

export const updateBark = (bark) => (dispatch, getState) => {
  dispatch(updateBarkStore(bark));
  updateBarkFireStore(bark);
};

//Love actions
export const addLove = (love) => (dispatch, getState) => {
  addLoveFireStore(love).then((data) =>
    dispatch(setLoves({ ...love, id: data.id }))
  );
};

export const unLove = (love) => (dispatch, getState) => {
  dispatch(removeLove(love));
  removeLoveFireStore(love);
};

export const loveCountChanger = (dataObj) => (dispatch, getState) => {
  dispatch(changeLoveCount(dataObj));
  loveCountChangerFireStore(dataObj);
};

export const removeAllLoves = (loves) => (dispatch, getState) => {
  dispatch(deleteAllLoves(loves.id));
  removeAllLovesFireStore(loves.filteredLoves);
};

//Comment actions
export const addComment = (comment) => (dispatch, getState) => {
  postCommentFireStore(comment).then((data) =>
    dispatch(setComments({ ...comment, id: data.id }))
  );
};

export const updateComment = (comment) => (dispatch, getState) => {
  postUpdateCommentFireStore(comment);
  dispatch(updateComments(comment));
};

export const removeCommentsOnBarkDelete =
  (comments) => (dispatch, getState) => {
    deleteAllCommentCardsFireStore(comments.commentsById);
    dispatch(deleteComment(comments.id));
  };

export const removeSingleComment = (comment) => (dispatch, getState) => {
  removeSingleCommentFireStore(comment);
  dispatch(deleteSingleComment(comment));
};

//Notification actions
export const addNotification = (notification) => (dispatch, getState) => {
  postNotificationFireStore(notification).then((data) =>
    dispatch(setNotifications({ ...notification, id: data.id }))
  );
};

export const removeNotification = (notification) => (dispatch, getState) => {
  deleteNotificationFireStore(notification);
  dispatch(takeNotificationOffTheList(notification));
};

export const clearNotifications = (notifications) => (dispatch, getState) => {
  if (notifications.length > 0) {
    clearNotificationsFireStore(notifications);
    dispatch(clearAllNotifications(notifications[0].userTo));
  }
};

export const markNotificationAsRead =
  (notification) => (dispatch, getState) => {
    markNotificationAsReadFireStore(notification);
    dispatch(markNotificationAsReadInStore(notification));
  };

export const removeAllNotifications =
  (notifications) => (dispatch, getState) => {
    const { id, filteredNotifications } = notifications;
    removeAllNotificationsFireStore(filteredNotifications);
    dispatch(deleteAllNotifications(id));
  };

//Comment Love actions

export const addCommentLove = (commentLove) => (dispatch, getState) => {
  addCommentLoveFireStore(commentLove).then((data) =>
    dispatch(addCommentLoveToStore({ ...commentLove, id: data.id }))
  );
};

export const removeCommentLove = (commentLove) => (dispatch, getState) => {
  removeCommentLoveFireStore(commentLove);
  dispatch(removeCommentLoveStore(commentLove));
};

export const removeAllCommentLoves = (commentLoves) => (dispatch, getState) => {
  const { filteredLoves } = commentLoves;
  removeAllCommentLovesFireStore(filteredLoves);
  dispatch(removeAllCommentLovesFromStore(filteredLoves));
};
