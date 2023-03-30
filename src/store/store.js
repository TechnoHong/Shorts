import { configureStore } from '@reduxjs/toolkit';
import ytInfoReducer from '../api/YoutubeAPI';
import alertReducer from '../controllers/alertSlice';

export const store = configureStore({
  reducer: {
    ytInfo: ytInfoReducer,
    alert: alertReducer,
  },
});
