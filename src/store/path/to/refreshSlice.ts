import { createSlice } from '@reduxjs/toolkit';

const refreshSlice = createSlice({
  name: 'refresh',
  initialState: {
    isUpdating: false,
  },
  reducers: {
    toogleRefresh: (state) => {
      state.isUpdating = !state.isUpdating;
    },
  }
});

export const { toogleRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
