import { RootState } from "../store";

export const selectGenres = (state: RootState) => state.genres.items;
export const selectGenresLoading = (state: RootState) => state.genres.isLoading;
export const selectGenresError = (state: RootState) => state.genres.error;
