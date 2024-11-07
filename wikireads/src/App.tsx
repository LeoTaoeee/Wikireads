import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './components/AuthContext';
import Home from './components/home';
import Register from './components/register';
import Login from './components/Login';
import Profile from './components/profile';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        ) : (
          <>
            <Register />
            <Login />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
