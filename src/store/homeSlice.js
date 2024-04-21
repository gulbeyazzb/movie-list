import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    response: [],
    query: "",
  },
  reducers: {
    setResponse: (state, action) => {
      state.response = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setResponse, setGenres, setSearchQuery } = homeSlice.actions;

export default homeSlice.reducer;
