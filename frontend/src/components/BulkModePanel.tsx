import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBulkMode,
  selectSelectedIds,
  selectTracks,
} from "../redux/tracks/selectors";
import { selectAllTracks, unselectAllTracks } from "../redux/tracks/slice";
import { deleteTracksBulk } from "../redux/tracks/operations";
import { AppDispatch } from "../redux/store";
import ConfirmDialog from "../shared/dialog/ConfirmDialog";
import { toast } from "sonner";

const BulkModePanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isActive = useSelector(selectBulkMode);
  const selectedIds = useSelector(selectSelectedIds);
  const allTracks = useSelector(selectTracks);

  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedTracks = allTracks.filter((track) =>
    selectedIds.includes(track.id)
  );

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await dispatch(
        deleteTracksBulk({ ids: selectedIds })
      ).unwrap();
      dispatch(unselectAllTracks());
      setShowConfirm(false);
      toast.success(`Deleted ${result.success.length} tracks successfully.`, {
        className: "toast-success",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete tracks.";
      toast.error(message, {
        className: "toast-error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === allTracks.length) {
      dispatch(unselectAllTracks());
      toast.info("All tracks unselected.", { className: "toast-info" });
    } else {
      dispatch(selectAllTracks());
      toast.info("All tracks selected.", { className: "toast-info" });
    }
  };

  const handleOpenConfirm = () => {
    if (!selectedIds.length) {
      toast.error("No tracks selected.", {
        className: "toast-error",
      });
      return;
    }

    toast.warning("Please confirm deletion.", {
      className: "toast-warning",
    });
    setShowConfirm(true);
  };

  if (!isActive) return null;

  return (
    <div className="flex items-center gap-4 p-2" aria-live="polite">
      <button
        data-testid="select-all"
        onClick={toggleSelectAll}
        disabled={isLoading}
        aria-disabled={isLoading}
        data-loading={isLoading ? "true" : undefined}
        className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {selectedIds.length === allTracks.length
          ? "Unselect All"
          : "Select All"}
      </button>

      <button
        data-testid="bulk-delete-button"
        onClick={handleOpenConfirm}
        disabled={!selectedIds.length || isLoading}
        aria-disabled={!selectedIds.length || isLoading}
        data-loading={isLoading ? "true" : undefined}
        className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50"
      >
        Delete Selected ({selectedIds.length})
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete the following ${selectedIds.length} track(s)? This cannot be undone.`}
      >
        <ul className="list-disc pl-5 text-sm text-gray-600">
          {selectedTracks.map((track) => (
            <li key={track.id}>
              {track.title} – {track.artist}
            </li>
          ))}
        </ul>
      </ConfirmDialog>
    </div>
  );
};

export default BulkModePanel;
