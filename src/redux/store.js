import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import barkSlice from './barkSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    bark: barkSlice,
  },
});
