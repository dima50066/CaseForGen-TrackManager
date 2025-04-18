import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import axiosInstance from "../../api/axios";
import { Genre } from "../../types/types";

export const fetchGenres = createAsyncThunk<
  Genre[],
  void,
  { rejectValue: string }
>("genres/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get<Genre[]>("/genres");
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    const message =
      error.response?.data && typeof error.response.data === "string"
        ? error.response.data
        : "Failed to fetch genres";
    return thunkAPI.rejectWithValue(message);
  }
});
