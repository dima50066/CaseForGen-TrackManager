import React from "react";
import type { Genre } from "../types/types";

interface Props {
  onSearchChange: (value: string) => void;
  onSortChange: (value: "title" | "artist" | "album" | "createdAt") => void;
  onGenreChange: (value: string) => void;
  onArtistChange: (value: string) => void;
  genres: Genre[];
  artists: string[];
  sortValue: string;
  genreValue: string;
  artistValue: string;
}

const TrackFilters: React.FC<Props> = ({
  onSearchChange,
  onSortChange,
  onGenreChange,
  onArtistChange,
  genres,
  artists,
  sortValue,
  genreValue,
  artistValue,
}) => {
  return (
    <>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <select
        data-testid="sort-select"
        value={sortValue}
        onChange={(e) =>
          onSortChange(
            e.target.value as "title" | "artist" | "album" | "createdAt"
          )
        }
        className="border p-2 rounded"
      >
        <option value="title">Title</option>
        <option value="artist">Artist</option>
        <option value="album">Album</option>
        <option value="createdAt">Created At</option>
      </select>

      <select
        data-testid="filter-genre"
        value={genreValue}
        onChange={(e) => onGenreChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>

      <select
        data-testid="filter-artist"
        value={artistValue}
        onChange={(e) => onArtistChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Artists</option>
        {artists.map((artist, index) => (
          <option key={`${artist}-${index}`} value={artist}>
            {artist}
          </option>
        ))}
      </select>
    </>
  );
};

export default React.memo(TrackFilters);
