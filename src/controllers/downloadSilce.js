import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   id: 0,
//   status: 'idle',
//   title: '',
//   ratio: 'fullWidth',
//   startTime: 0,
//   endTime: 0,
// };

const initialState = []

const downloadSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    appendHistory(state, action) {
      state = [...state, action.payload]
    },
    updateHistory(state, action) {

    },
    changeRatio(state, action) {
      state.ratio = action.payload
    },
    changeStartTime(state, action) {
      state.startTime = action.payload
      state.duration = state.endTime - action.payload
    },
    changeEndTime(state, action) {
      state.endTime = action.payload
      state.duration = action.payload - state.startTime
    }
  },
});

export const { changeRatio, changeStartTime, changeEndTime } = downloadSlice.actions;
export default downloadSlice.reducer;
