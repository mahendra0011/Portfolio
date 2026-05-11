import { configureStore, createSlice } from "@reduxjs/toolkit";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    projectFilter: "All",
  },
  reducers: {
    setProjectFilter: (state, action) => {
      state.projectFilter = action.payload;
    },
  },
});

export const { setProjectFilter } = portfolioSlice.actions;

export const selectProjectFilter = (state) => state.portfolio.projectFilter;

export const store = configureStore({
  reducer: {
    portfolio: portfolioSlice.reducer,
  },
});
