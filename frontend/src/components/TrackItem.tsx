import React, { useState } from "react";
import { Track } from "../types/types";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Icon from "../shared/icon/Icon";
import Modal from "../shared/modal/Modal";
import TrackForm from "./TrackForm";
interface Props {
  track: Track;
}

const TrackItem: React.FC<Props> = ({ track }) => {
  const audioUrl = track.audioFile ? `/uploads/${track.audioFile}` : null;
  const [isEditOpen, setIsEditOpen] = useState(false);

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
      <div className="flex gap-4 mt-2 items-center">
        <button
          data-testid={`edit-track-${track.id}`}
          onClick={() => setIsEditOpen(true)}
          className="hover:text-blue-600 transition-colors"
        >
          <Icon id="edit" className="w-5 h-5 text-black stroke-black" />
        </button>

        <button
          data-testid={`delete-track-${track.id}`}
          onClick={() => {
            // TODO: open confirm delete dialog
          }}
          className="hover:text-red-600 transition-colors"
        >
          <Icon id="trash" className="w-5 h-5" />
        </button>

        <button
          data-testid={`upload-track-${track.id}`}
          onClick={() => {
            // TODO: open upload modal
          }}
          className="hover:text-green-600 transition-colors"
        >
          <Icon id="upload" className="w-5 h-5" />
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

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        classNameWrapper="max-w-2xl w-full sm:w-[90%] "
      >
        <TrackForm
          track={{
            ...track,
            genres: track.genres,
            slug: track.slug,
          }}
          onSubmitComplete={() => setIsEditOpen(false)}
        />
      </Modal>
    </li>
  );
};

export default TrackItem;
