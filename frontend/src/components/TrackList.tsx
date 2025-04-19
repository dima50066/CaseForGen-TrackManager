import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBulkMode, selectSelectedIds } from "../redux/tracks/selectors";
import { toggleSelectTrack } from "../redux/tracks/slice";
import TrackItem from "./TrackItem";
import type { Track } from "../types/types";

interface Props {
  tracks: Track[];
  isLoading: boolean;
}

const TrackList: React.FC<Props> = ({ tracks, isLoading }) => {
  const dispatch = useDispatch();
  const bulkMode = useSelector(selectBulkMode);
  const selectedIds = useSelector(selectSelectedIds) || [];

  if (isLoading) {
    return <div data-testid="loading-tracks">Loading...</div>;
  }

  if (!tracks.length) {
    return <div>No tracks found.</div>;
  }

  return (
    <ul className="space-y-4">
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

export default TrackList;
