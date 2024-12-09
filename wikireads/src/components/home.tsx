// Home.tsx

import React from 'react';
import Navbar from './Navbar';
import { container, content, header, section, scrollableCardContainer } from './home_style';
import Card from './Card';
import { continueReadingData, articlesYouMightLikeData } from './data'; // Import data arrays

const Home: React.FC = () => {
  return (
    <div style={container}>
      <Navbar />
      <div style={content}>
        {/* Header */}
        <h1 style={header}>Welcome to Wikireads!</h1>

        {/* Continue Reading Section */}
        <section style={section}>
          <h2>Continue Reading...</h2>
          <div style={scrollableCardContainer}>
            {continueReadingData.map((data) => (
              <Card key={data.id} title={data.title} imageSrc={data.imageSrc} />
            ))}
          </div>
        </section>

        {/* Articles You Might Like Section */}
        <section style={section}>
          <h2>Articles You Might Like...</h2>
          <div style={scrollableCardContainer}>
            {articlesYouMightLikeData.map((data) => (
              <Card key={data.id} title={data.title} imageSrc={data.imageSrc} rating={data.rating} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
