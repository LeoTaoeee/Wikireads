import React from 'react';
import Navbar from './navbar';

const friends: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1>Friend Page</h1>
      <p>This is the friend page content.</p>
    </div>
  );
};

export default friends;
