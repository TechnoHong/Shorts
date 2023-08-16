import { configureStore } from '@reduxjs/toolkit';
import ytInfoReducer from '../api/YoutubeAPI';
import alertReducer from '../controllers/alertSlice';
import editReducer from '../controllers/editSlice';
import downloadSlice from "../controllers/downloadSlice";

export const store = configureStore({
  reducer: {
    ytInfo: ytInfoReducer,
    alert: alertReducer,
    edit: editReducer,
    download: downloadSlice,
  },
});
