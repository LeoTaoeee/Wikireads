// src/components/ArticlePage.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api'; // Ensure this points to your API service

// Define the structure of an article from the backend
interface BackendArticle {
  article_name: string;
  article_filename: string;
  avg_rating: number | null;
  genre: string;
}

// Define the structure of the article fetched from Wikipedia
interface WikipediaArticle {
  title: string;
  extract: string;
  pageUrl: string;
}

// Styled Components
const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`;

const RatingContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  font-size: 1.5rem;
  cursor: pointer;
`;

const RatingText = styled.p`
  margin-top: 0.5rem;
  color: #f39c12;
`;

const ExternalLink = styled.a`
  display: inline-block;
  margin-top: 1rem;
  color: #3498db;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Loading and Error Messages
const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-size: 1.2rem;
`;

const ArticlePage: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [backendArticle, setBackendArticle] = useState<BackendArticle | null>(null);
  const [wikipediaArticle, setWikipediaArticle] = useState<WikipediaArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        // Step 1: Fetch the list of articles from the backend
        const response = await api.get('/userreads'); // Ensure this endpoint returns the correct data
        const data = response.data;

        // Step 2: Combine currentreads and pastreads
        const allArticles: BackendArticle[] = [
          ...data.currentreads,
          ...data.pastreads,
        ];

        // Step 3: Find the specific article by title
        const decodedTitle = decodeURIComponent(title || '').toLowerCase();
        const foundArticle = allArticles.find(
          (article) => article.article_name.toLowerCase() === decodedTitle
        );

        if (!foundArticle) {
          setError('Article not found.');
          setLoading(false);
          return;
        }

        setBackendArticle(foundArticle);

        // Step 4: Fetch additional details from Wikipedia API
        const wikiResponse = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(foundArticle.article_name)}`
        );

        if (!wikiResponse.ok) {
          throw new Error('Failed to fetch data from Wikipedia.');
        }

        const wikiData = await wikiResponse.json();

        const fetchedWikipediaArticle: WikipediaArticle = {
          title: wikiData.title,
          extract: wikiData.extract,
          pageUrl: wikiData.content_urls.desktop.page,
        };

        setWikipediaArticle(fetchedWikipediaArticle);
      } catch (err: any) {
        console.error('Error fetching article data:', err);
        setError('An error occurred while fetching the article.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [title]);

  // Handle image error by setting to default
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/assets/default.png';
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Loading article...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (!backendArticle || !wikipediaArticle) {
    return (
      <Container>
        <ErrorMessage>Article data is incomplete.</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Title>{wikipediaArticle.title}</Title>
        <Image
          src={`/assets/${backendArticle.article_filename}`}
          alt={wikipediaArticle.title}
          onError={handleImageError}
        />
        <Paragraph>{wikipediaArticle.extract}</Paragraph>

        {/* Rating Section */}
        <RatingContainer>
          <h3>Rate this Article:</h3>
          <Stars>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} role="button">
                ★
              </span>
            ))}
          </Stars>
          <RatingText>
            Your Rating: {backendArticle.avg_rating ? `${backendArticle.avg_rating} ⭐` : 'N/A'}
          </RatingText>
        </RatingContainer>

        {/* Link to Wikipedia */}
        <ExternalLink href={wikipediaArticle.pageUrl} target="_blank" rel="noopener noreferrer">
          Read more on Wikipedia
        </ExternalLink>
      </Content>
    </Container>
  );
};

export default ArticlePage;
