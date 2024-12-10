// src/components/Home.tsx

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import Card from './card'; // Corrected import casing
import api from '../services/api';
import { ReadArticle, DEFAULT_CURRENT_READS, DEFAULT_PAST_READS } from './data/defaults'; // Adjusted import path

// Styled Components
const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Allows children to take full width */
  padding: 2rem;
  width: 100%; /* Full width */
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Section = styled.section`
  width: 100%;
  margin-top: 2rem;
`;

const ScrollableCardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 1rem;
  gap: 1rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* WebKit */
  }

  width: 100%;
`;

const AddArticleForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 2rem auto; /* Center horizontally and add bottom margin */
  width: 100%;
  max-width: 500px;
  box-sizing: border-box; /* Include padding in width */
`;

const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 1rem;
`;

const LoadingMessage = styled.p`
  text-align: center;
`;

const Home: React.FC = () => {
  const [currentReads, setCurrentReads] = useState<ReadArticle[]>([]);
  const [pastReads, setPastReads] = useState<ReadArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [newArticleUrl, setNewArticleUrl] = useState<string>('');

  useEffect(() => {
    const fetchUserReads = async () => {
      try {
        const response = await api.get('/userreads'); // Ensure this endpoint exists and returns correct data
        const data = response.data;
        console.log('Fetched User Reads:', data); // Debug log

        // No longer need to map to imageUrl, pass image_filename directly
        setCurrentReads(data.currentreads);
        setPastReads(data.pastreads);
      } catch (err: any) {
        console.error('API call failed, using default data:', err);
        setError('Failed to fetch your reads. Displaying default reads.');

        // Set default data
        setCurrentReads(DEFAULT_CURRENT_READS);
        setPastReads(DEFAULT_PAST_READS);
      } finally {
        setLoading(false);
      }
    };

    fetchUserReads();
  }, []);

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewArticleUrl(e.target.value);
  };

  // Function to extract article title from Wikipedia URL
  const extractTitleFromUrl = (url: string): string | null => {
    try {
      const parsedUrl = new URL(url);
      if (
        parsedUrl.hostname === 'en.wikipedia.org' ||
        parsedUrl.hostname.endsWith('.wikipedia.org')
      ) {
        const pathSegments = parsedUrl.pathname.split('/');
        const titleIndex = pathSegments.findIndex(segment => segment === 'wiki');
        if (titleIndex !== -1 && pathSegments.length > titleIndex + 1) {
          const extractedTitle = decodeURIComponent(pathSegments[titleIndex + 1].replace(/_/g, ' '));
          console.log('Extracted Title:', extractedTitle); // Debug log
          return extractedTitle;
        }
      }
      return null;
    } catch (error) {
      console.error('Error parsing URL:', error);
      return null;
    }
  };

  // Handle form submission
  const handleAddArticle = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const title = extractTitleFromUrl(newArticleUrl);
    if (!title) {
      setError('Please enter a valid Wikipedia article URL.');
      return;
    }

    // Check if the article already exists
    const exists = currentReads.some(
      article => article.article_name.toLowerCase() === title.toLowerCase()
    );
    if (exists) {
      setError('This article is already in your current reads.');
      return;
    }

    try {
      // Assign a default image filename
      const defaultImageFilename = 'default.png'; // Filename of the default image

      // Create a new ReadArticle object
      const newArticle: ReadArticle = {
        article_name: title,
        article_filename: defaultImageFilename, // Just the filename
        avg_rating: null,
        genre: 'Unknown' // You can enhance this to determine genre based on article content
      };
      console.log('New Article Object:', newArticle); // Debug log

      // Update the currentReads state
      setCurrentReads(prevReads => [newArticle, ...prevReads]);

      // Reset the input field and show success message
      setNewArticleUrl('');
      setSuccess('Article added successfully!');
    } catch (error) {
      console.error('Error adding new article:', error);
      setError('An error occurred while adding the article.');
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Loading your reads...</LoadingMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        {/* Header */}
        <Header>Welcome to Wikireads!</Header>

        {/* Add Article Form */}
        <AddArticleForm onSubmit={handleAddArticle}>
          <Input
            type="text"
            placeholder="Enter Wikipedia Article URL"
            value={newArticleUrl}
            onChange={handleInputChange}
            required
          />
          <Button type="submit">Add Article</Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
        </AddArticleForm>

        {/* Continue Reading Section */}
        <Section>
          <h2>Continue Reading...</h2>
          {currentReads.length > 0 ? (
            <ScrollableCardContainer>
              {currentReads.map((article) => (
                <Card
                  key={article.article_name} // Assuming article_name is unique
                  title={article.article_name}
                  image_filename={article.article_filename} // Updated prop
                  rating={article.avg_rating ? `${article.avg_rating} ⭐` : 'No rating'}
                />
              ))}
            </ScrollableCardContainer>
          ) : (
            <p>You have no current reads.</p>
          )}
        </Section>

        {/* Articles You Might Like Section */}
        <Section>
          <h2>Articles You Might Like...</h2>
          {pastReads.length > 0 ? (
            <ScrollableCardContainer>
              {pastReads.map((article) => (
                <Card
                  key={article.article_name} // Assuming article_name is unique
                  title={article.article_name}
                  image_filename={article.article_filename} // Updated prop
                  rating={article.avg_rating ? `${article.avg_rating} ⭐` : 'No rating'}
                />
              ))}
            </ScrollableCardContainer>
          ) : (
            <p>You have no past reads.</p>
          )}
        </Section>
      </Content>
    </Container>
  );
};

export default Home;
