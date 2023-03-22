export const baseUrl = "http://localhost:3000";

//User calls
export const getUsers = () =>
  fetch(`${baseUrl}/accounts`).then((res) => res.json());

export const postUser = (userDetails) =>
  fetch(`${baseUrl}/accounts`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });

//Bark calls
export const getBarks = () =>
  fetch(`${baseUrl}/barks`).then((res) => res.json());

export const postBark = (bark) =>
  fetch(`${baseUrl}/barks`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bark),
  }).then((res) => res.json());

export const updateBarkApi = (bark) => {
  fetch(`${baseUrl}/barks/${bark.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bark),
  });
};

//Love calls
export const getLoves = () =>
  fetch(`${baseUrl}/loves`).then((res) => res.json());

export const postLove = (love) =>
  fetch(`${baseUrl}/loves`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(love),
  }).then((res) => res.json());

export const deleteLove = (love) =>
  fetch(`${baseUrl}/loves/${love.id}`, {
    method: "DELETE",
  });

export const increaseLove = (bark) =>
  fetch(`${baseUrl}/barks/${bark.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bark),
  }).then((res) => res.json());

//Comment calls
export const getComments = () =>
  fetch(`${baseUrl}/comments`).then((res) => res.json());

export const postComment = (comment) =>
  fetch(`${baseUrl}/comments`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(comment),
  });

export const postUpdateComment = (comment) => {
  fetch(`${baseUrl}/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(comment),
  });
};

//User calls
export const sendUserDetails = (userDetails) => {
  fetch(`${baseUrl}/accounts/${userDetails.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });
};

//Notification calls
export const getNotifications = () =>
  fetch(`${baseUrl}/notifications`).then((res) => res.json());

export const postNotification = (notification) =>
  fetch(`${baseUrl}/notifications`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(notification),
  }).then((res) => res.json());

export const deleteNotification = (notification) => {
  if (notification !== undefined) {
    fetch(`${baseUrl}/notifications/${notification.id}`, {
      method: "DELETE",
    });
  }
};

export const postClearNotifications = (id) => {
  fetch(`${baseUrl}/notifications/${id}`, {
    method: "DELETE",
  });
};

export const deleteBarkCard = (id) => {
  fetch(`${baseUrl}/barks/${id}`, {
    method: "DELETE",
  });
};

export const deleteCommentCard = (id) => {
  fetch(`${baseUrl}/comments/${id}`, {
    method: "DELETE",
  });
};
