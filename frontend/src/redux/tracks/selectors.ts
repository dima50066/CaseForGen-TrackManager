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
// ======== GENRES =======
// ===============================
export const selectGenres = (state: RootState) => state.tracks.genres.items;
export const selectGenresLoading = (state: RootState) =>
  state.tracks.genres.isLoading;
export const selectGenresError = (state: RootState) =>
  state.tracks.genres.error;
