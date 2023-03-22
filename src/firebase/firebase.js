import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const storageRef = storage.ref();

//USER FIRE STORE ACTIONS
export const signUpFireStore = (userDetails) => {
  const updatedDetails = { ...userDetails };
  delete updatedDetails.password;
  return auth
    .createUserWithEmailAndPassword(userDetails.user, userDetails.password)
    .then((data) => {
      updatedDetails.uid = data.user.uid;
      db.collection('users').add(updatedDetails);
    });
};

export const signInFireStore = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password).catch((error) => {
    console.error(error.code + error.message);
  });
};

export const getSignedUserData = (uid) => {
  return db
    .collection('users')
    .where('uid', '==', uid)
    .get()
    .catch((error) => {
      console.error(error.code + error.message);
    });
};

export const updateUserDetailsFireStore = (userDetails) => {
  delete userDetails.password;
  console.log(userDetails);

  db.collection('users')
    .where('uid', '==', userDetails.uid)
    .get()
    .then((data) =>
      data.forEach((item) =>
        db
          .collection('users')
          .doc(item.id)
          .update({ ...userDetails }),
      ),
    );
};

export const updateContentWithUserDetailsFireStore = (userCredentials) => {
  const { newCredentials, oldCredentials } = userCredentials;

  db.collection('barks')
    .where('userHandle', '==', oldCredentials.userName)
    .get()
    .then((data) =>
      data.forEach((item) =>
        db.collection('barks').doc(item.id).update({
          profilePicture: newCredentials.profilePicture,
          userHandle: newCredentials.userName,
        }),
      ),
    );
  db.collection('comments')
    .where('userHandle', '==', oldCredentials.userName)
    .get()
    .then((data) =>
      data.forEach((item) =>
        db.collection('comments').doc(item.id).update({
          avatar: newCredentials.profilePicture,
          userHandle: newCredentials.userName,
        }),
      ),
    );
  db.collection('notifications')
    .where('userHandle', '==', oldCredentials.userName)
    .get()
    .then((data) =>
      data.forEach((item) =>
        db
          .collection('notifications')
          .doc(item.id)
          .update({ userHandle: newCredentials.userName }),
      ),
    );
  db.collection('notifications')
    .where('userTo', '==', oldCredentials.userName)
    .get()
    .then((data) =>
      data.forEach((item) =>
        db
          .collection('notifications')
          .doc(item.id)
          .update({ userTo: newCredentials.userName }),
      ),
    );
  db.collection('loves')
    .where('userHandle', '==', oldCredentials.userName)
    .get()
    .then((data) =>
      data.forEach((item) =>
        db
          .collection('loves')
          .doc(item.id)
          .update({ userHandle: newCredentials.userName }),
      ),
    );
};

//BARKS FIRE STORE ACTIONS
export const getBarksFireStore = () => {
  return db
    .collection('barks')
    .get()
    .then((data) => {
      let barks = [];
      data.forEach((item) => {
        barks.push({
          ...item.data(),
          id: item.id,
          createdAt: item.data().createdAt.toDate(),
        });
      });
      return barks;
    });
};

export const addBarkFireStore = (bark) => {
  return db.collection('barks').add(bark);
};

export const updateBarkFireStore = (bark) => {
  db.collection('barks').doc(bark.id).update({ barkBody: bark.barkBody });
};

export const removeBarkFireStore = (id) => {
  db.collection('barks').doc(id).delete();
};

//LOVES FIRE STORE ACTIONS
export const getLovesFireStore = () => {
  return db
    .collection('loves')
    .get()
    .then((data) => {
      let loves = [];
      data.forEach((item) => loves.push({ ...item.data(), id: item.id }));
      return loves;
    });
};

export const addLoveFireStore = (love) => {
  return db.collection('loves').add(love);
};

export const loveCountChangerFireStore = (dataObj) => {
  const { type, data } = dataObj;
  db.collection(type).doc(data.id).update({ loveCount: data.loveCount });
};

export const removeLoveFireStore = (love) => {
  db.collection('loves').doc(love.id).delete();
};

export const removeAllLovesFireStore = (loves) => {
  loves.forEach((item) => db.collection('loves').doc(item.id).delete());
};

// COMMENTS FIRE STORE ACTIONS
export const getCommentsFireStore = () => {
  return db
    .collection('comments')
    .get()
    .then((data) => {
      let comments = [];
      data.forEach((item) =>
        comments.push({
          ...item.data(),
          id: item.id,
          createdAt: item.data().createdAt.toDate(),
        }),
      );
      return comments;
    });
};

export const postCommentFireStore = (comment) => {
  return db.collection('comments').add(comment);
};

export const postUpdateCommentFireStore = (comment) => {
  db.collection('comments')
    .doc(comment.id)
    .update({ commentBody: comment.commentBody });
};

export const deleteAllCommentCardsFireStore = (comments) => {
  comments.forEach((item) => db.collection('comments').doc(item.id).delete());
};

export const removeSingleCommentFireStore = (comment) => {
  db.collection('comments').doc(comment.id).delete();
};

// NOTIFICATIONS FIRE STORE ACTIONS
export const getNotificationsFireStore = () => {
  return db
    .collection('notifications')
    .get()
    .then((data) => {
      let notifications = [];
      data.forEach((item) =>
        notifications.push({ ...item.data(), id: item.id }),
      );
      return notifications;
    });
};

export const postNotificationFireStore = (notification) => {
  return db.collection('notifications').add(notification);
};

export const deleteNotificationFireStore = (notification) => {
  if (notification) {
    db.collection('notifications').doc(notification.id).delete();
  }
};

export const clearNotificationsFireStore = (notifications) =>
  notifications.forEach((item) =>
    db.collection('notifications').doc(item.id).update({ isRead: true }),
  );

export const markNotificationAsReadFireStore = (notification) => {
  db.collection('notifications').doc(notification.id).update({ isRead: true });
};

export const removeAllNotificationsFireStore = (notifications) => {
  notifications.forEach((item) =>
    db.collection('notifications').doc(item.id).delete(),
  );
};

//COMMENT LOVE FIRE STORE ACTIONS
export const getCommentLovesFireStore = () => {
  return db
    .collection('commentLoves')
    .get()
    .then((data) => {
      let commentLoves = [];
      data.forEach((item) =>
        commentLoves.push({ ...item.data(), id: item.id }),
      );
      return commentLoves;
    });
};

export const addCommentLoveFireStore = (commentLove) => {
  return db.collection('commentLoves').add(commentLove);
};

export const removeCommentLoveFireStore = (commentLove) => {
  db.collection('commentLoves').doc(commentLove.id).delete();
};

export const removeAllCommentLovesFireStore = (commentLoves) => {
  commentLoves.forEach((item) =>
    db.collection('commentLoves').doc(item.id).delete(),
  );
};
