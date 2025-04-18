import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const TracksPage = lazy(() => import("./pages/TracksPage"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/tracks" element={<TracksPage />} />
          <Route
            path="*"
            element={
              <div className="text-center text-2xl font-bold mt-10">
                404 | Page Not Found
              </div>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
