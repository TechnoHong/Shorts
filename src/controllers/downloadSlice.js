import { createSlice } from '@reduxjs/toolkit';

const initialState = []

const downloadSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    appendHistory(state, action) {
      state.push({
        ...action.payload,
        status: 'pending',
      })
    },
    completeDownload(state, action) {
      return state.map((item) => {
        if (item.url === action.payload)
          return {...item, status: 'done'}
        return item
      })
    },
    failedDownload(state, action) {
      return state.map((item) => {
        if (item.url === action.payload)
          return {...item, status: 'failed'}
        return item
      })
    },
  },
});

export const { appendHistory, completeDownload, failedDownload } = downloadSlice.actions;
export default downloadSlice.reducer;
