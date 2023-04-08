import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const action = {
  getYtInfo: createAsyncThunk('GET/YTINFO', async ({ ytURL, count, range }) => {
    return axios({
      method: 'post',
      url: `/scraping/?url=${ytURL}&count=${count}&time=${range}`,
    }).then((response) => response.data);
  }),
};

/*
{
  "result": true,
  "url": "https://www.youtube.com/watch?v=FVRXlaC1oZg",
  "mr_info": [
    88540,
    93200,
    102520
  ],
  "title": "개발을 시작한 당신에게 해주고 싶은 이야기",
  "owner": {
    "owner": "노마드 코더 Nomad Coders",
    "owner_url": "/@nomadcoders",
    "owner_subscribers": "구독자 45.9만명"
  },
  "upload_date": "2022. 8. 28.",
  "tags": [],
  "view_count": "조회수 231,298회"
}

*/
const initialState = {
  info: {
    success: true ,
    result: {
      video_id: '',
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
