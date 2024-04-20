import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    response: {},
    genres: {},
  },
  reducers: {
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { setResponse, setGenres } = homeSlice.actions;

export default homeSlice.reducer;
