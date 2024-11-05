import React from 'react';
import { useAuth } from './AuthContext';

const Navbar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li><a href="" style={styles.navLink}>Home</a></li>
        <li><a href="profile" style={styles.navLink}>Profile</a></li>
        <li><button onClick={logout} style={styles.logoutButton}>Logout</button></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#333',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    gap: '1rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none', // No underline
  },
  logoutButton: {
    background: 'none',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Navbar;
