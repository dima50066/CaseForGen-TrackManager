import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import axiosInstance from "../../api/axios";
import {
  FetchTracksParams,
  FetchTracksResponse,
  CreateTrackDto,
  TrackResponse,
  UpdateTrackArgs,
  DeleteTrackParams,
  DeleteTracksDto,
  DeleteTracksResponse,
  UploadTrackAudioResponse,
  Genre,
} from "../../types/types";

// ===============================
// ========== GET TRACKS =========
// ===============================
export const fetchTracks = createAsyncThunk<
  FetchTracksResponse,
  FetchTracksParams | undefined,
  { rejectValue: string }
>("tracks/fetchAll", async (params, thunkAPI) => {
  try {
    const res = await axiosInstance.get<FetchTracksResponse>("/tracks", {
      params,
    });
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    const message =
      error.response?.data && typeof error.response.data === "string"
        ? error.response.data
        : "Error loading tracks";
    return thunkAPI.rejectWithValue(message);
  }
});

// ===============================
// ======== CREATE TRACK =========
// ===============================
export const createTrack = createAsyncThunk<
  TrackResponse,
  CreateTrackDto,
  { rejectValue: string }
>("tracks/create", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post<TrackResponse>("/tracks", data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    const message =
      error.response?.data && typeof error.response.data === "string"
        ? error.response.data
        : "Failed to create track";
    return thunkAPI.rejectWithValue(message);
  }
});

// ===============================
// ======== GET TRACK BY SLUG ====
// ===============================
export const fetchTrackBySlug = createAsyncThunk<
  TrackResponse,
  string,
  { rejectValue: string }
>("tracks/fetchBySlug", async (slug, thunkAPI) => {
  try {
    const res = await axiosInstance.get<TrackResponse>(`/tracks/${slug}`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    const message =
      error.response?.data && typeof error.response.data === "string"
        ? error.response.data
        : "Failed to load track";
    return thunkAPI.rejectWithValue(message);
  }
});

// ===============================
// ========= UPDATE TRACK ========
// ===============================
export const updateTrack = createAsyncThunk<
  TrackResponse,
  UpdateTrackArgs,
  { rejectValue: string }
>("tracks/update", async ({ id, data }, thunkAPI) => {
  try {
    const res = await axiosInstance.put<TrackResponse>(`/tracks/${id}`, data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    const message =
      error.response?.data && typeof error.response.data === "string"
        ? error.response.data
        : "Failed to update track";
    return thunkAPI.rejectWithValue(message);
  }
});

// ===============================
// ========= DELETE TRACK ========
// ===============================
export const deleteTrack = createAsyncThunk<
  number,
  DeleteTrackParams,
  { rejectValue: string }
>("tracks/delete", async (id, thunkAPI) => {
  try {
    await axiosInstance.delete(`/tracks/${id}`);
    return id;
  } catch (err) {
    const error = err as AxiosError;
    const message =
      error.response?.data && typeof error.response.data === "string"
        ? error.response.data
        : "Failed to delete track";
    return thunkAPI.rejectWithValue(message);
  }
});

// ===============================
// ===== DELETE MULTIPLE TRACKS ==
// ===============================
export const deleteTracksBulk = createAsyncThunk<
  DeleteTracksResponse,
  DeleteTracksDto,
  { rejectValue: string }
>("tracks/deleteBulk", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post<DeleteTracksResponse>(
      "/tracks/delete",
      data
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    const message =
      error.response?.data && typeof error.response.data === "string"
        ? error.response.data
        : "Failed to delete tracks";
    return thunkAPI.rejectWithValue(message);
  }
});

// ===============================
// ===== UPLOAD AUDIO FILE =======
// ===============================
export const uploadTrackAudio = createAsyncThunk<
  UploadTrackAudioResponse,
  { id: number; file: File },
  { rejectValue: string }
>("tracks/uploadAudio", async ({ id, file }, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post<UploadTrackAudioResponse>(
      `/tracks/${id}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    const message =
      error.response?.data && typeof error.response.data === "string"
        ? error.response.data
        : "Failed to upload audio";
    return thunkAPI.rejectWithValue(message);
  }
});

// ===============================
// ==== DELETE TRACK AUDIO FILE ==
// ===============================
export const deleteTrackAudio = createAsyncThunk<
  TrackResponse,
  number,
  { rejectValue: string }
>("tracks/deleteAudio", async (id, thunkAPI) => {
  try {
    const res = await axiosInstance.delete<TrackResponse>(`/tracks/${id}/file`);
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    const message =
      error.response?.data && typeof error.response.data === "string"
        ? error.response.data
        : "Failed to delete audio file";
    return thunkAPI.rejectWithValue(message);
  }
});

// ===============================
// ========= FETCH GENRES ========
// ===============================

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
