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

const BulkModePanel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isActive = useSelector(selectBulkMode);
  const selectedIds = useSelector(selectSelectedIds);
  const allTracks = useSelector(selectTracks);
  const [showConfirm, setShowConfirm] = useState(false);

  const selectedTracks = allTracks.filter((track) =>
    selectedIds.includes(track.id)
  );

  const handleDelete = () => {
    dispatch(deleteTracksBulk({ ids: selectedIds }));
    dispatch(unselectAllTracks());
    setShowConfirm(false);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === allTracks.length) {
      dispatch(unselectAllTracks());
    } else {
      dispatch(selectAllTracks());
    }
  };

  if (!isActive) return null;

  return (
    <div className="flex items-center gap-4 p-2">
      <button
        data-testid="select-all"
        onClick={toggleSelectAll}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        {selectedIds.length === allTracks.length
          ? "Unselect All"
          : "Select All"}
      </button>

      <button
        data-testid="bulk-delete-button"
        onClick={() => setShowConfirm(true)}
        disabled={!selectedIds.length}
        className="px-3 py-1 bg-red-600 text-white rounded"
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
