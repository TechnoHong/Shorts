import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL

export const action = {
  getYtInfo: createAsyncThunk('GET/YTINFO', async ({ ytURL, count, range }) => {
    return axios({
      method: 'post',
      url: `${BASE_URL}/scraping/?url=${ytURL}&count=${count}&time=${range}`
    }).then((response) => response.data);
  }),
};

const initialState = {
  info: {
    success: true ,
    result: {
      url: '',
      mr_info: [],
      title: '',
      owner: {
        owner: '',
        owner_subscribers: '',
        owner_url: '',
      },
      upload_date: '',
      tags: [],
      view_count: '',
      video_length: '',
      video_id: '',
    }
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
