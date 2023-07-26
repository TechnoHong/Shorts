import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ratio: 'fullWidth',
  startTime: 0,
  endTime: 0,
  duration: 0,
};

const editSlice = createSlice({
  name: 'videoEdit',
  initialState,
  reducers: {
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

export const { changeRatio, changeStartTime, changeEndTime } = editSlice.actions;
export default editSlice.reducer;
