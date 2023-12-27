import { createSlice } from '@reduxjs/toolkit';

const initState = [];

export const sourceSlice = createSlice({
  name: 'sources',
  initialState: initState,
  reducers: {
    setSource: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setSource } = sourceSlice.actions;

export default sourceSlice.reducer;
