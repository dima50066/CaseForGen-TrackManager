import React from "react";
import { Track } from "../types/types";
import TrackItem from "./TrackItem";

interface Props {
  tracks: Track[];
  isLoading: boolean;
}

const TrackList: React.FC<Props> = ({ tracks, isLoading }) => {
  if (isLoading) {
    return <div data-testid="loading-tracks">Loading...</div>;
  }

  if (!tracks.length) {
    return <div>No tracks found.</div>;
  }

  return (
    <ul className="space-y-4">
      {tracks.map((track) => (
        <TrackItem key={track.id} track={track} />
      ))}
    </ul>
  );
};

export default TrackList;
