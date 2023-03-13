import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SampleAPI from '../api/SampleAPI';

const initialState = { value: 0, loading: 'none' };

export const fetchAsync = createAsyncThunk('sample/async', async () => {
  const response = await SampleAPI.getSampleData();
  return response.data.message;
});

const counterSlice = createSlice({
  name: 'counter', // 내부적으로 중복을 피하기 위해 사용되는 고유한 값
  initialState, // 초기값
  reducers: {
    // 상태 변화를 처리하는 함수를 정의
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    // 비동기 처리
    builder.addCase(fetchAsync.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchAsync.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.value = action.payload;
    });
    builder.addCase(fetchAsync.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
