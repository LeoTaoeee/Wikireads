import React from 'react';
import { useAuth } from './components/AuthContext';
import Login from './components/login';
import Register from './components/register';

const App: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <h1>Welcome!</h1>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Register />
          <Login />
        </>
      )}
    </div>
  );
};

export default App;
