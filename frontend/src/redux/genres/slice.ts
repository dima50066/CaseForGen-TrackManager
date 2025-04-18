import { createSlice } from "@reduxjs/toolkit";
import { fetchGenres } from "./operations";
import { Genre } from "../../types/types";

interface GenresState {
  items: Genre[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GenresState = {
  items: [],
  isLoading: false,
  error: null,
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch genres";
      });
  },
});

export const genresReducer = genresSlice.reducer;
