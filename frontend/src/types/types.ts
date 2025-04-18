// ===============================
// ========= ENTITIES ============
// ===============================

export interface Genre {
  id: number;
  name: string;
}
export interface GenresState {
  items: Genre[];
  isLoading: boolean;
  error: string | null;
}

export interface Track {
  id: number;
  title: string;
  artist: string;
  album?: string;
  coverImage?: string;
  genres: string[];
  audioFile: string;
  createdAt: string;
  updatedAt: string;
}

// ===============================
// ======== REDUX STATE ==========
// ===============================

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TracksState {
  items: Track[];
  meta: Meta | null;
  isLoading: boolean;
  error: string | null;
}

// ===============================
// ========== GET TRACKS =========
// ===============================

export interface FetchTracksParams {
  page?: number;
  limit?: number;
  sort?: "title" | "artist" | "album" | "createdAt";
  order?: "asc" | "desc";
  search?: string;
  genre?: string;
  artist?: string;
}

export interface FetchTracksResponse {
  data: Track[];
  meta: Meta;
}

// ===============================
// ======== CREATE TRACK =========
// ===============================

export interface CreateTrackDto {
  title: string;
  artist: string;
  album?: string;
  genres: string[];
  coverImage?: string;
}

export interface TrackResponse {
  id: number;
  title: string;
  artist: string;
  album?: string;
  genres: Genre[];
  slug: string;
  coverImage?: string;
  audioFile?: string;
  createdAt: string;
  updatedAt: string;
}

// ===============================
// ===== GET TRACK BY SLUG =======
// ===============================

export interface TrackBySlugState {
  item: TrackResponse | null;
  isLoading: boolean;
  error: string | null;
}

// ===============================
// ========= UPDATE TRACK ========
// ===============================

export interface UpdateTrackDto {
  title: string;
  artist: string;
  album?: string;
  genres: string[];
  coverImage?: string;
}

export interface UpdateTrackArgs {
  id: number;
  data: UpdateTrackDto;
}

// ===============================
// ========= DELETE TRACK ========
// ===============================

export type DeleteTrackParams = number;

// ===============================
// ===== DELETE MULTIPLE TRACKS ==
// ===============================

export interface DeleteTracksDto {
  ids: number[];
}

export interface DeleteTracksResponse {
  success: number[];
  failed: number[];
}

// ===============================
// ===== UPLOAD AUDIO FILE =======
// ===============================

export interface UploadTrackAudioResponse {
  id: number;
  title: string;
  artist: string;
  album?: string;
  genres: Genre[];
  slug: string;
  coverImage?: string;
  audioFile?: string;
  createdAt: string;
  updatedAt: string;
}
