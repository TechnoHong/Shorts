import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const action = {
  getYtInfo: createAsyncThunk('GET/YTINFO', async ({ ytURL, count }) => {
    return axios({
      method: 'post',
      url: `/scraping/?url=${ytURL}&count=${count}`,
    }).then((response) => response.data);
  }),
};

const initialState = {
  info: {},
  state: 'idle',
};

export const reducer = {
  getYtInfo: (state, action) => {
    state.info = action.payload;
    state.state = 'done';
  },
  handlePending: (state) => {
    state.state = 'loading';
  },
};

const ytInfoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(action.getYtInfo.pending, reducer.handlePending)
    .addCase(action.getYtInfo.fulfilled, reducer.getYtInfo);
});

export default ytInfoReducer;
