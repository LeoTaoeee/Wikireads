// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home';
import Login from './components/Login';
import ArticlePage from './components/ArticlePage';
import Navbar from './components/navbar';
import { useAuth } from './context/AuthContext'; // Import the custom hook

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Protected Route component
  const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      {/* Navbar is included here and consumes AuthContext internally */}
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/article/:title"
          element={
            <ProtectedRoute>
              <ArticlePage />
            </ProtectedRoute>
          }
        />
        {/* Redirect any unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
