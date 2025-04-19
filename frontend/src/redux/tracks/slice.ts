import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTracks,
  createTrack,
  fetchTrackBySlug,
  updateTrack,
  deleteTrack,
  deleteTracksBulk,
  uploadTrackAudio,
  deleteTrackAudio,
} from "./operations";
import { TracksState, TrackResponse } from "../../types/types";
import { normalizeTrack } from "../../utils/normalizeTrack";

// ===============================
// ======= COMBINED STATE TYPE ===
// ===============================
interface CombinedTracksState extends TracksState {
  selectedTrack: TrackResponse | null;
  selectedTrackLoading: boolean;
  selectedTrackError: string | null;
  bulkMode: boolean;
  selectedIds: number[];
}

// ===============================
// ========== INITIAL STATE ======
// ===============================
const initialState: CombinedTracksState = {
  items: [],
  meta: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },
  isLoading: false,
  error: null,
  selectedTrack: null,
  selectedTrackLoading: false,
  selectedTrackError: null,
  bulkMode: false,
  selectedIds: [],
};

// ===============================
// ========== SLICE ==============
// ===============================
const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    toggleBulkMode(state) {
      state.bulkMode = !state.bulkMode;
      state.selectedIds = [];
    },
    toggleSelectTrack(state, action) {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter(
          (trackId) => trackId !== id
        );
      } else {
        state.selectedIds.push(id);
      }
    },
    selectAllTracks(state) {
      state.selectedIds = state.items.map((t) => t.id);
    },
    unselectAllTracks(state) {
      state.selectedIds = [];
    },
  },
  extraReducers: (builder) => {
    // ============================
    // ======= FETCH TRACKS =======
    // ============================
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch tracks";
      });

    // ============================
    // ======= CREATE TRACK =======
    // ============================
    builder
      .addCase(createTrack.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTrack.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(normalizeTrack(action.payload));
      })
      .addCase(createTrack.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to create track";
      });

    // ===============================
    // ===== FETCH TRACK BY SLUG =====
    // ===============================
    builder
      .addCase(fetchTrackBySlug.pending, (state) => {
        state.selectedTrackLoading = true;
        state.selectedTrackError = null;
      })
      .addCase(fetchTrackBySlug.fulfilled, (state, action) => {
        state.selectedTrackLoading = false;
        state.selectedTrack = action.payload;
      })
      .addCase(fetchTrackBySlug.rejected, (state, action) => {
        state.selectedTrackLoading = false;
        state.selectedTrackError =
          action.payload || "Failed to fetch track by slug";
      });

    // ===============================
    // ========= UPDATE TRACK ========
    // ===============================
    builder
      .addCase(updateTrack.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTrack.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = normalizeTrack(action.payload);
        }
        if (state.selectedTrack?.id === action.payload.id) {
          state.selectedTrack = action.payload;
        }
      })
      .addCase(updateTrack.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update track";
      });

    // ===============================
    // ========= DELETE TRACK ========
    // ===============================
    builder
      .addCase(deleteTrack.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTrack.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          (track) => track.id !== action.payload
        );
        if (state.selectedTrack?.id === action.payload) {
          state.selectedTrack = null;
        }
      })
      .addCase(deleteTrack.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete track";
      });

    // ===============================
    // ===== DELETE MULTIPLE TRACKS ==
    // ===============================
    builder
      .addCase(deleteTracksBulk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTracksBulk.fulfilled, (state, action) => {
        state.isLoading = false;
        const successIds = new Set(action.payload.success);
        state.items = state.items.filter((track) => !successIds.has(track.id));
        if (state.selectedTrack && successIds.has(state.selectedTrack.id)) {
          state.selectedTrack = null;
        }
      })
      .addCase(deleteTracksBulk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete multiple tracks";
      });

    // ===============================
    // ===== UPLOAD AUDIO FILE =======
    // ===============================
    builder
      .addCase(uploadTrackAudio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadTrackAudio.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (track) => track.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = normalizeTrack(action.payload);
        }
        if (state.selectedTrack?.id === action.payload.id) {
          state.selectedTrack = action.payload;
        }
      })
      .addCase(uploadTrackAudio.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to upload audio file";
      });

    // ===============================
    // ==== DELETE AUDIO FILE ========
    // ===============================
    builder
      .addCase(deleteTrackAudio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTrackAudio.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (track) => track.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = normalizeTrack(action.payload);
        }
        if (state.selectedTrack?.id === action.payload.id) {
          state.selectedTrack = action.payload;
        }
      })
      .addCase(deleteTrackAudio.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete audio file";
      });
  },
});

export const {
  toggleBulkMode,
  toggleSelectTrack,
  selectAllTracks,
  unselectAllTracks,
} = trackSlice.actions;

export const tracksReducer = trackSlice.reducer;
