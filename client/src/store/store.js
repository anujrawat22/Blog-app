// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice'
import postsreducer from '../features/postSlice'
import commentreducer from '../features/commentSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsreducer,
    comments: commentreducer
  },
});

export default store;
