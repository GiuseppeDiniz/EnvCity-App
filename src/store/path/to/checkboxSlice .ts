import { createSlice } from '@reduxjs/toolkit';

const checkboxSlice = createSlice({
  name: 'checkbox',
  initialState: {
    checkbox1: true,
    checkbox2: true
  },
  reducers: {
    toggleCheckbox1: (state) => {
      state.checkbox1 = !state.checkbox1;
    },
    toggleCheckbox2: (state) => {
      state.checkbox2 = !state.checkbox2;
    }
  }
});

export const { toggleCheckbox1, toggleCheckbox2 } = checkboxSlice.actions;
export default checkboxSlice.reducer;
