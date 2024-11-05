import React from 'react';
import Navbar from './navbar';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div style={styles.content}>
        <h1>Welcome to the Home Page!</h1>
        <p>This is the main content of the home page.</p>
      </div>
    </div>
  );
};

const styles = {
  content: {
    padding: '2rem',
  },
};

export default Home;
