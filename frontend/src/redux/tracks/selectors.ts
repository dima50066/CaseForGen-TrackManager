import { RootState } from "../store";

// ===============================
// ======== TRACKS LIST ==========
// ===============================
export const selectTracks = (state: RootState) => state.tracks.items;
export const selectIsLoading = (state: RootState) => state.tracks.isLoading;
export const selectError = (state: RootState) => state.tracks.error;
export const selectMeta = (state: RootState) => state.tracks.meta;

// ===============================
// ======== SELECTED TRACK =======
// ===============================
export const selectSelectedTrack = (state: RootState) =>
  state.tracks.selectedTrack;
export const selectSelectedTrackLoading = (state: RootState) =>
  state.tracks.selectedTrackLoading;
export const selectSelectedTrackError = (state: RootState) =>
  state.tracks.selectedTrackError;
// ===============================
// ======== BULK MODE =======
// ===============================

export const selectBulkMode = (state: RootState) => state.tracks.bulkMode;
export const selectSelectedIds = (state: RootState) => state.tracks.selectedIds;
