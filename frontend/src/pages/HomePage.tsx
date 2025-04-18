import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-3xl font-bold mb-4" data-testid="home-header">
        Welcome to Track Manager 🎵
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Manage your music library with ease.
      </p>
      <button
        onClick={() => navigate("/tracks")}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        data-testid="go-to-tracks-button"
      >
        Go to Tracks
      </button>
    </div>
  );
};

export default HomePage;
