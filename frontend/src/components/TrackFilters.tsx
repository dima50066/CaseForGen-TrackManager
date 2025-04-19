import React from "react";
import { toast } from "sonner";
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
  const handleGenreChange = (value: string) => {
    onGenreChange(value);
    toast(`Filtering by Genre: ${value || "All"}`, {
      className: "toast-info",
    });
  };

  const handleArtistChange = (value: string) => {
    onArtistChange(value);
    toast(`Filtering by Artist: ${value || "All"}`, {
      className: "toast-info",
    });
  };

  const handleSortChange = (
    value: "title" | "artist" | "album" | "createdAt"
  ) => {
    onSortChange(value);
    toast(`Sorted by ${value}`, {
      className: "toast-info",
    });
  };

  return (
    <>
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search..."
        aria-label="Search tracks"
        onChange={(e) => onSearchChange(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <select
        data-testid="sort-select"
        value={sortValue}
        aria-label="Sort tracks"
        onChange={(e) =>
          handleSortChange(
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
        aria-label="Filter by genre"
        onChange={(e) => handleGenreChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        data-testid="filter-artist"
        value={artistValue}
        aria-label="Filter by artist"
        onChange={(e) => handleArtistChange(e.target.value)}
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
