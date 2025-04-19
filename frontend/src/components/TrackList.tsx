import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBulkMode, selectSelectedIds } from "../redux/tracks/selectors";
import { toggleSelectTrack } from "../redux/tracks/slice";
import TrackItem from "./TrackItem";
import type { Track } from "../types/types";
import { toast } from "sonner";

interface Props {
  tracks: Track[];
  isLoading: boolean;
}

const TrackList: React.FC<Props> = ({ tracks, isLoading }) => {
  const dispatch = useDispatch();
  const bulkMode = useSelector(selectBulkMode);
  const selectedIds = useSelector(selectSelectedIds) || [];

  useEffect(() => {
    if (!isLoading && tracks.length === 0) {
      toast.warning("No tracks found for current filters.", {
        className: "toast-warning",
      });
    }
  }, [isLoading, tracks]);

  if (isLoading) {
    return (
      <div
        data-testid="loading-tracks"
        className="text-center text-gray-500"
        aria-busy="true"
        aria-live="polite"
      >
        Loading...
      </div>
    );
  }

  if (!tracks.length) {
    return (
      <div
        data-testid="empty-track-list"
        className="text-center text-gray-600 italic"
        aria-live="polite"
      >
        No tracks found.
      </div>
    );
  }

  return (
    <ul className="space-y-4" data-testid="track-list">
      {tracks.map((track) => (
        <TrackItem
          key={track.id}
          track={track}
          bulkMode={bulkMode}
          isSelected={selectedIds.includes(track.id)}
          onToggle={() => dispatch(toggleSelectTrack(track.id))}
        />
      ))}
    </ul>
  );
};

export default React.memo(TrackList);
