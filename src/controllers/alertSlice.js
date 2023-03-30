import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  severity: 'info',
  description: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    show(state, action) {
      state.isVisible = true;
      state.severity = action.payload.severity;
      state.description = action.payload.message;
    },
    hide(state) {
      state.isVisible = false;
    },
  },
});

export const { show, hide } = alertSlice.actions;
export default alertSlice.reducer;
