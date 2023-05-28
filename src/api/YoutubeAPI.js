import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const action = {
  getYtInfo: createAsyncThunk('GET/YTINFO', async ({ ytURL, count, range }) => {
    return axios({
      method: 'post',
      url: `http://43.201.99.75:5000/scraping/?url=${ytURL}&count=${count}&time=${range}`,
    }).then((response) => response.data);
  }),
};

/*
{
  "success": true,
  "result": {
    "url": "https://www.youtube.com/watch?v=UpzOzDkWsXA",
    "mr_info": [
      {
        "start_time": 594820,
        "end_time": 604820,
        "ratio": 100
      },
      {
        "start_time": 2071300,
        "end_time": 2081300,
        "ratio": 85.51
      },
      {
        "start_time": 779380,
        "end_time": 789380,
        "ratio": 77.29
      }
    ],
    "title": "[",
    "owner": {
      "owner": "디글 :Diggle",
      "owner_url": "/@Diggle",
      "owner_subscribers": "구독자 256만명"
    },
    "upload_date": "2023. 2. 1.",
    "tags": [],
    "view_count": "조회수 1,145,824회",
    "video_length": 2307000,
    "video_id": "UpzOzDkWsXA"
  }
}
*/
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
