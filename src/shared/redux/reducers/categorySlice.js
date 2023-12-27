import { createSlice } from '@reduxjs/toolkit';

const initState = [];

export const categorySlice = createSlice({
  name: 'categories',
  initialState: initState,
  reducers: {
    setCategory: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
