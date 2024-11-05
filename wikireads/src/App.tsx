import React from 'react';
import { useAuth } from './components/AuthContext';

import Login from './components/login';
import Register from './components/register';
import Home from './components/home';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      {isAuthenticated ? <Home /> : (
        <>
          <Register />
          <Login />
        </>
      )}
    </div>
  );
};

export default App;