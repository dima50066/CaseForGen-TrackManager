import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrackFilters from "../components/TrackFilters";
import TrackList from "../components/TrackList";
import Pagination from "../components/Pagination";
import { fetchTracks } from "../redux/tracks/operations";
import { fetchGenres } from "../redux/genres/operations";
import {
  selectTracks,
  selectIsLoading,
  selectMeta,
} from "../redux/tracks/selectors";
import { selectGenres } from "../redux/genres/selectors";
import type { AppDispatch } from "../redux/store";
import { debounce } from "lodash";
import Modal from "../shared/modal/Modal";
import TrackForm from "../components/TrackForm";

const TracksPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const tracks = useSelector(selectTracks);
  const isLoading = useSelector(selectIsLoading);
  const meta = useSelector(selectMeta);
  const genres = useSelector(selectGenres) || [];

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"title" | "artist" | "album" | "createdAt">(
    "createdAt"
  );
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchTracks({
        page,
        limit: 10,
        search,
        sort,
        order: "desc",
        genre,
        artist,
      })
    );
  }, [dispatch, page, search, sort, genre, artist]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
        setPage(1);
      }, 500),
    []
  );
  const uniqueArtists = Array.from(
    new Set(
      tracks
        .map((t) => t.artist?.trim().toLowerCase())
        .filter((a): a is string => !!a)
    )
  );

  return (
    <div className="p-4 space-y-6">
      <h1 data-testid="tracks-header" className="text-2xl font-bold">
        Tracks
      </h1>

      <div className="flex flex-wrap gap-4 items-center">
        <button
          data-testid="create-track-button"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Track
        </button>

        <TrackFilters
          onSearchChange={debouncedSearch}
          onSortChange={(val: "title" | "artist" | "album" | "createdAt") =>
            setSort(val)
          }
          onGenreChange={(val) => setGenre(val)}
          onArtistChange={(val) => setArtist(val)}
          genres={genres}
          artists={uniqueArtists}
          sortValue={sort}
          genreValue={genre}
          artistValue={artist}
        />
      </div>

      <TrackList tracks={tracks} isLoading={isLoading} />

      <Pagination
        page={page}
        totalPages={meta?.totalPages || 1}
        onNext={() => setPage((prev) => prev + 1)}
        onPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        classNameWrapper="max-w-2xl w-full sm:w-[90%]"
      >
        <TrackForm onSubmitComplete={() => setIsCreateModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default TracksPage;
