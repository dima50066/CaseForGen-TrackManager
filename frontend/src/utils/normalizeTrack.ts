import { Track, TrackResponse } from "../types/types";

export const normalizeTrack = (track: TrackResponse): Track => ({
  id: track.id,
  title: track.title,
  artist: track.artist,
  album: track.album,
  coverImage: track.coverImage,
  genres: track.genres,
  audioFile: track.audioFile || "",
  createdAt: track.createdAt,
  updatedAt: track.updatedAt,
  slug: track.slug,
});
