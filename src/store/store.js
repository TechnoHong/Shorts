import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './sampleSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
