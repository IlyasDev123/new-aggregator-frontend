import { createSlice } from '@reduxjs/toolkit';

const initState = [];

export const authorSlice = createSlice({
  name: 'authors',
  initialState: initState,
  reducers: {
    setAuthor: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
