// Card.tsx

import React from 'react';
import { card, cardImage, cardTitle, cardRating } from './home_style';

interface CardProps {
  title: string;
  imageSrc: string;
  rating?: string;
}

const Card: React.FC<CardProps> = ({ title, imageSrc, rating }) => {
  return (
    <div style={card}>
      <img src={imageSrc} alt={title} style={cardImage} />
      <div style={cardTitle}>{title}</div>
      {rating && <div style={cardRating}>{rating}</div>}
    </div>
  );
};

export default Card;
