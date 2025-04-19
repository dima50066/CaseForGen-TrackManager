import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { createTrack, updateTrack } from "../redux/tracks/operations";
import { fetchGenres } from "../redux/genres/operations";
import { selectGenres } from "../redux/genres/selectors";
import type {
  CreateTrackDto,
  UpdateTrackDto,
  TrackResponse,
} from "../types/types";
import clsx from "clsx";

interface Props {
  track?: TrackResponse | null;
  onSubmitComplete: () => void;
}

const TrackForm: React.FC<Props> = ({ track, onSubmitComplete }) => {
  const dispatch = useDispatch<AppDispatch>();
  const genres = useSelector(selectGenres);

  const isEdit = !!track;

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    if (isEdit && track) {
      setTitle(track.title);
      setArtist(track.artist);
      setAlbum(track.album || "");
      setCoverImage(track.coverImage || "");
      setSelectedGenres(track.genres);
    } else {
      setTitle("");
      setArtist("");
      setAlbum("");
      setCoverImage("");
      setSelectedGenres([]);
    }
    setErrors({});
  }, [track, isEdit]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!artist.trim()) errs.artist = "Artist is required";
    if (selectedGenres.length === 0) errs.genre = "At least one genre required";
    if (coverImage && !/^https?:\/\/.+/.test(coverImage)) {
      errs.coverImage = "Invalid image URL";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGenreAdd = (genre: string) => {
    if (!selectedGenres.includes(genre)) {
      setSelectedGenres((prev) => [...prev, genre]);
    }
  };

  const handleGenreRemove = (genre: string) => {
    setSelectedGenres((prev) => prev.filter((g) => g !== genre));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const dto: CreateTrackDto | UpdateTrackDto = {
      title,
      artist,
      album,
      coverImage,
      genres: selectedGenres,
    };

    if (isEdit && track) {
      await dispatch(updateTrack({ id: track.id, data: dto }));
    } else {
      await dispatch(createTrack(dto));
    }

    onSubmitComplete();
  };

  return (
    <form
      data-testid="track-form"
      onSubmit={handleSubmit}
      className="space-y-4 p-4"
    >
      <h2 className="text-xl font-semibold">
        {isEdit ? "Edit Track" : "Create Track"}
      </h2>

      <div>
        <label className="block font-medium">Title</label>
        <input
          data-testid="input-title"
          className="border p-2 rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <div data-testid="error-title" className="text-red-500 text-sm">
            {errors.title}
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium">Artist</label>
        <input
          data-testid="input-artist"
          className="border p-2 rounded w-full"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        {errors.artist && (
          <div data-testid="error-artist" className="text-red-500 text-sm">
            {errors.artist}
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium">Album</label>
        <input
          data-testid="input-album"
          className="border p-2 rounded w-full"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium">Cover Image URL</label>
        <input
          data-testid="input-cover-image"
          className="border p-2 rounded w-full"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />
        {errors.coverImage && (
          <div data-testid="error-coverImage" className="text-red-500 text-sm">
            {errors.coverImage}
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Genres</label>
        <div data-testid="genre-selector" className="flex flex-wrap gap-2 mb-2">
          {selectedGenres.map((g) => (
            <span
              key={g}
              className="bg-blue-200 text-blue-800 px-2 py-1 rounded flex items-center"
            >
              {g}
              <button
                type="button"
                className="ml-1 text-sm"
                onClick={() => handleGenreRemove(g)}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {genres
            .filter((g) => !selectedGenres.includes(g))
            .map((g) => (
              <button
                key={g}
                type="button"
                className="text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                onClick={() => handleGenreAdd(g)}
              >
                + {g}
              </button>
            ))}
        </div>

        {errors.genre && (
          <div data-testid="error-genre" className="text-red-500 text-sm">
            {errors.genre}
          </div>
        )}
      </div>

      <button
        type="submit"
        data-testid="submit-button"
        className={clsx(
          "px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700",
          "disabled:opacity-50"
        )}
      >
        {isEdit ? "Save Changes" : "Create"}
      </button>
    </form>
  );
};

export default TrackForm;
