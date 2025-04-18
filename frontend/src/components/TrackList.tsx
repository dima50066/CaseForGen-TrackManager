import React from "react";
import { Track } from "../types/types";

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
        <li
          key={track.id}
          data-testid={`track-item-${track.id}`}
          className="border p-4 rounded shadow-sm bg-white"
        >
          <div
            data-testid={`track-item-${track.id}-title`}
            className="font-semibold"
          >
            {track.title}
          </div>
          <div
            data-testid={`track-item-${track.id}-artist`}
            className="text-gray-700"
          >
            {track.artist}
          </div>

          {/* TODO: Add album, genres, image, edit/delete/upload buttons, and audio player */}
        </li>
      ))}
    </ul>
  );
};

export default TrackList;
