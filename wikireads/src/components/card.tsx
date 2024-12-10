// src/components/Card.tsx

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  image_filename: string;
  rating: string;
}

const CardContainer = styled.div`
  flex: 0 0 auto; /* Prevent shrinking */
  width: 200px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 150px;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;

const Rating = styled.p`
  margin: 0;
  color: #f39c12;
`;

const Card: React.FC<CardProps> = ({ title, image_filename, rating }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${encodeURIComponent(title)}`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/assets/default.png'; // Fallback image from frontend
  };

  return (
    <CardContainer onClick={handleClick}>
      <Image src={`/assets/${image_filename}`} alt={title} onError={handleImageError} />
      <Content>
        <Title>{title}</Title>
        <Rating>{rating}</Rating>
      </Content>
    </CardContainer>
  );
};

export default Card;
