import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const action = {
  getYtInfo: createAsyncThunk('GET/YTINFO', async ({ ytURL, count }) => {
    return axios({
      method: 'post',
      url: `/scraping/?url=${ytURL}&count=${count}&time=60`,
    }).then((response) => response.data);
  }),
};

const initialState = {
  info: {
    url: '',
    title: '',
    owner: {
      owner: '',
      owner_subscribers: '',
      owner_url: '',
    },
    upload_date: '',
    tags: [],
    mr_info: '',
    view_count: '',
  },
  loading: false,
};

export const reducer = {
  getYtInfo: (state, action) => {
    state.info = action.payload;
    state.loading = false;
  },
  handlePending: (state) => {
    state.loading = true;
  },
  handleRejected: (state) => {
    state.loading = false;
  },
};

const ytInfoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(action.getYtInfo.pending, reducer.handlePending)
    .addCase(action.getYtInfo.fulfilled, reducer.getYtInfo)
    .addCase(action.getYtInfo.rejected, reducer.handleRejected);
});

export default ytInfoReducer;
