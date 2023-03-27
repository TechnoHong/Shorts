import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './sampleSlice';
import ytInfoReducer from '../api/YoutubeAPI';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    ytInfo: ytInfoReducer,
  },
});
