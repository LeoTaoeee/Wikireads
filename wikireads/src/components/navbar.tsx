import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li><Link to="/" style={styles.navLink}>Home</Link></li>
        <li><Link to="/profile" style={styles.navLink}>Profile</Link></li>
        <li><Link to="/friends" style={styles.navLink}>Friends</Link></li>
        <li><Link to="/favorites" style={styles.navLink}>Favorites</Link></li>
        <li><Link to="/settings" style={styles.navLink}>Settings</Link></li>
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
