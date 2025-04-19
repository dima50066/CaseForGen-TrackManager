import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Track } from "../types/types";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Icon from "../shared/icon/Icon";
import Modal from "../shared/modal/Modal";
import TrackForm from "./TrackForm";
import UploadForm from "./UploadForm";
import ConfirmDialog from "../shared/dialog/ConfirmDialog";
import { deleteTrack } from "../redux/tracks/operations";
import { AppDispatch } from "../redux/store";
import { toast } from "sonner";

interface Props {
  track: Track;
  bulkMode?: boolean;
  isSelected?: boolean;
  onToggle?: () => void;
}

const TrackItem: React.FC<Props> = ({
  track,
  bulkMode,
  isSelected,
  onToggle,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const audioUrl = track.audioFile ? `/uploads/${track.audioFile}` : null;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await dispatch(deleteTrack(track.id)).unwrap();
      toast.success(`Track "${track.title}" deleted successfully`, {
        className: "toast-success",
      });
    } catch {
      toast.error("Failed to delete track. Please try again.", {
        className: "toast-error",
      });
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
    }
  };

  return (
    <li
      key={track.id}
      data-testid={`track-item-${track.id}`}
      className={`border-2 p-4 rounded shadow-sm bg-white space-y-3 cursor-pointer transition ${
        bulkMode && isSelected ? "border-blue-600 bg-blue-50" : ""
      }`}
    >
      <div
        className="flex gap-4"
        onDoubleClick={() => bulkMode && onToggle?.()}
      >
        {track.coverImage && (
          <img
            src={track.coverImage}
            alt={`${track.title} cover`}
            className="w-24 h-24 object-cover rounded flex-shrink-0 bg-white"
            style={{ backgroundColor: "white" }}
            data-testid={`track-cover-${track.id}`}
          />
        )}

        <div className="flex flex-col justify-between w-full space-y-1">
          <div>
            <div
              data-testid={`track-item-${track.id}-title`}
              className="text-lg font-bold"
            >
              {track.title}
            </div>
            <div
              className="text-gray-700"
              data-testid={`track-item-${track.id}-artist`}
            >
              {track.artist}
            </div>
            {track.album && (
              <div
                className="text-sm text-gray-500 italic"
                data-testid={`track-item-${track.id}-album`}
              >
                Album: {track.album}
              </div>
            )}
            {track.genres.length > 0 && (
              <div
                className="text-sm text-gray-600"
                data-testid={`track-item-${track.id}-genres`}
              >
                Genres: {track.genres.join(", ")}
              </div>
            )}
          </div>

          <div className="flex gap-4 items-center mt-1">
            <button
              onClick={() => setIsEditOpen(true)}
              className="hover:text-blue-600 transition-colors"
              data-testid={`edit-track-${track.id}`}
              aria-label={`Edit ${track.title}`}
            >
              <Icon id="edit" className="w-5 h-5 text-black stroke-black" />
            </button>

            <button
              onClick={() => setIsConfirmOpen(true)}
              className="hover:text-red-600 transition-colors"
              data-testid={`delete-track-${track.id}`}
              aria-label={`Delete ${track.title}`}
              disabled={isDeleting}
              aria-disabled={isDeleting}
              data-loading={isDeleting ? "true" : undefined}
            >
              <Icon id="trash" className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsUploadOpen(true)}
              className="hover:text-green-600 transition-colors"
              data-testid={`upload-track-${track.id}`}
              aria-label={`Upload file for ${track.title}`}
            >
              <Icon id="upload" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {audioUrl && (
        <div className="mt-4" data-testid={`audio-player-${track.id}`}>
          <AudioPlayer
            src={audioUrl}
            layout="horizontal"
            customAdditionalControls={[]}
            showJumpControls={false}
            progressJumpSteps={{ forward: 5000, backward: 5000 }}
          />
        </div>
      )}

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        classNameWrapper="max-w-2xl w-full sm:w-[90%]"
      >
        <TrackForm
          track={{ ...track, genres: track.genres, slug: track.slug }}
          onSubmitComplete={() => setIsEditOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        classNameWrapper="max-w-xl w-full"
      >
        <UploadForm
          trackId={track.id}
          onUploadComplete={() => setIsUploadOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Track"
        description={`Are you sure you want to delete "${track.title}"? This cannot be undone.`}
      />
    </li>
  );
};

export default TrackItem;
