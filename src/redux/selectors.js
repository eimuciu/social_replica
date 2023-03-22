//User selectors
export const selectUserCredentials = (state) => state.user.credentials;

//Notifications selectors
export const selectNotifications = (state) => state.bark.notifications;

export const selectNotificationsByUserName = (state) => {
  const { notifications } = state.bark;
  const { userName } = state.user.credentials;
  let filteredNotifications = notifications.filter(
    (item) => item.userTo === userName,
  );
  filteredNotifications.sort((a, b) =>
    a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1,
  );
  return filteredNotifications;
};

export const selectNumberOfUnReadNotifications = (state) => {
  const { notifications } = state.bark;
  const { userName } = state.user.credentials;
  let filteredNotifications = notifications.filter(
    (item) => item.userTo === userName,
  );
  return filteredNotifications.filter((item) => item.isRead === false).length;
};

export const selectLikedNotificationByBarkId = (state, id) => {
  const { notifications } = state.bark;
  const { credentials } = state.user;
  return notifications.find(
    (item) =>
      item.barkId === id &&
      item.type === 'like' &&
      item.userHandle === credentials.userName,
  );
};

export const selectAllNotificationsByBarkId = (state, id) => {
  const { notifications } = state.bark;
  return notifications.filter((item) => item.barkId === id);
};

//Barks selectors
export const selectBarksByDate = (state) => {
  let barks = [...state.bark.barks];
  barks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return barks;
};

//Comments selectors
export const selectAllCommentsByBarkId = (state, id) => {
  const { comments } = state.bark;
  return comments.filter((item) => item.barkId === id);
};

//Loves selectors
export const selectAllLovesByBarkId = (state, id) => {
  const { loves } = state.bark;
  return loves.filter((item) => item.barkId === id);
};

export const selectBarkUserLoved = (state, id) => {
  const { loves } = state.bark;
  const { credentials } = state.user;
  return loves.find(
    (x) => x.userHandle === credentials.userName && x.barkId === id,
  );
};

//Comment loves selectors
export const selectAllCommentLovesByBarkId = (state, id) => {
  const { comments } = state.bark;
  const { commentLoves } = state.bark;
  let allCommentsByBarkId = comments.filter((item) => item.barkId === id);
  let yFilter = allCommentsByBarkId.map((x) => x.id);
  return commentLoves.filter((x) => yFilter.includes(x.commentId));
};

//Theme selector
export const selectTheme = (state) => state.user.theme;
