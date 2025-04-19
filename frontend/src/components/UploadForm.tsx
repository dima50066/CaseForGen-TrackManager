import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { uploadTrackAudio, deleteTrackAudio } from "../redux/tracks/operations";
import { selectTracks } from "../redux/tracks/selectors";
import { toast } from "sonner";

interface Props {
  trackId: number;
  onUploadComplete: () => void;
}

const MAX_FILE_SIZE_MB = 10;

const UploadForm: React.FC<Props> = ({ trackId, onUploadComplete }) => {
  const dispatch = useDispatch<AppDispatch>();
  const tracks = useSelector(selectTracks);
  const currentTrack = tracks.find((t) => t.id === trackId);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateFile = (f: File) => {
    const validTypes = ["audio/mpeg", "audio/wav"];
    const maxSize = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (!validTypes.includes(f.type)) {
      return "Unsupported file type. Only MP3 or WAV allowed.";
    }

    if (f.size > maxSize) {
      return `File too large. Max ${MAX_FILE_SIZE_MB}MB allowed.`;
    }

    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const validationError = validateFile(selected);
      if (validationError) {
        setError(validationError);
        toast.error(validationError, { className: "toast-error" });
        setFile(null);
      } else {
        setError(null);
        setFile(selected);
        toast.success(`Selected file: ${selected.name}`, {
          className: "toast-success",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      await dispatch(uploadTrackAudio({ id: trackId, file })).unwrap();
      toast.success("Audio uploaded successfully!", {
        className: "toast-success",
      });
      onUploadComplete();
    } catch {
      toast.error("Failed to upload audio file.", {
        className: "toast-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteTrackAudio(trackId)).unwrap();
      toast.success("Audio removed.", { className: "toast-success" });
      onUploadComplete();
    } catch {
      toast.error("Failed to delete audio file.", {
        className: "toast-error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4" data-testid="upload-form" aria-live="polite">
      <h2 className="text-xl font-semibold">Upload Audio</h2>

      <div>
        <label
          htmlFor="audio-file"
          className="cursor-pointer inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          {file ? file.name : "Choose file"}
        </label>
        <input
          id="audio-file"
          data-testid="audio-input"
          type="file"
          accept=".mp3,.wav"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload audio file"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm" data-testid="upload-error">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          data-testid="upload-button"
          onClick={handleUpload}
          disabled={!file || loading}
          aria-disabled={!file || loading}
          data-loading={loading ? "true" : undefined}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Upload
        </button>

        {currentTrack?.audioFile && (
          <button
            data-testid="delete-audio-button"
            onClick={handleDelete}
            disabled={loading}
            aria-disabled={loading}
            data-loading={loading ? "true" : undefined}
            className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Delete Audio
          </button>
        )}
      </div>

      {currentTrack?.audioFile && (
        <div className="mt-4" data-testid="audio-preview">
          <audio controls src={`/uploads/${currentTrack.audioFile}`} />
        </div>
      )}
    </div>
  );
};

export default UploadForm;
