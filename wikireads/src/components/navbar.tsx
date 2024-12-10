// src/components/Navbar.tsx

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the custom hook

const Nav = styled.nav`
  background-color: #34495e;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    color: #ecf0f1;
  }
`;

const LogoutButton = styled.button`
  padding: 0.3rem 0.6rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    console.log('Logout clicked'); // Debug log
    logout();
  };

  return (
    <Nav>
      <Logo>Wikireads</Logo>
      <NavLinks>
        {isAuthenticated ? (
          <>
            <StyledLink to="/">Home</StyledLink>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <StyledLink to="/login">Login</StyledLink>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
