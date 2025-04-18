import React from "react";
import { Track } from "../types/types";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface Props {
  track: Track;
}

const TrackItem: React.FC<Props> = ({ track }) => {
  const audioUrl = track.audioFile ? `/uploads/${track.audioFile}` : null;

  return (
    <li
      key={track.id}
      data-testid={`track-item-${track.id}`}
      className="border p-4 rounded shadow-sm bg-white space-y-3"
    >
      {/* COVER IMAGE */}
      {track.coverImage && (
        <img
          src={track.coverImage}
          alt={`${track.title} cover`}
          className="w-24 h-24 object-cover rounded"
        />
      )}

      {/* TITLE & ARTIST */}
      <div className="space-y-1">
        <div
          data-testid={`track-item-${track.id}-title`}
          className="text-lg font-bold"
        >
          {track.title}
        </div>
        <div
          data-testid={`track-item-${track.id}-artist`}
          className="text-gray-700"
        >
          {track.artist}
        </div>
        {track.album && (
          <div className="text-sm text-gray-500 italic">
            Album: {track.album}
          </div>
        )}
        {track.genres.length > 0 && (
          <div className="text-sm text-gray-600">
            Genres: {track.genres.join(", ")}
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mt-2">
        <button
          data-testid={`edit-track-${track.id}`}
          className="text-blue-600 hover:underline"
          onClick={() => {
            // TODO: open edit modal
          }}
        >
          Edit
        </button>
        <button
          data-testid={`delete-track-${track.id}`}
          className="text-red-600 hover:underline"
          onClick={() => {
            // TODO: open confirm delete dialog
          }}
        >
          Delete
        </button>
        <button
          data-testid={`upload-track-${track.id}`}
          className="text-green-600 hover:underline"
          onClick={() => {
            // TODO: open upload modal
          }}
        >
          Upload
        </button>
      </div>

      {/* AUDIO PLAYER */}
      {audioUrl && (
        <div data-testid={`audio-player-${track.id}`} className="mt-4">
          <AudioPlayer
            src={audioUrl}
            data-testid={`audio-progress-${track.id}`}
            layout="horizontal"
            customAdditionalControls={[]}
            showJumpControls={false}
          />
        </div>
      )}
    </li>
  );
};

export default TrackItem;
