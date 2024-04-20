import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    response: {},
    genres: {},
  },
  reducers: {
    getResponse: (state, action) => {
      state.response = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { getResponse, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
