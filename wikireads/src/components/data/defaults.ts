// src/components/data/defaults.ts

export interface ReadArticle {
    article_name: string;
    article_filename: string; // New field
    avg_rating: number | null;
    genre: string;
  }


  // Define the interface for ArticlePage
  export interface ArticleData {
    title: string;
    extract: string;
    pageUrl: string;
    imageUrl: string;
  }

  // Define default current reads
  export const DEFAULT_CURRENT_READS: ReadArticle[] = [
    {
      article_name: "React Basics",
      article_filename: "/assets/react.jpg", // Local asset path
      avg_rating: 4.5,
      genre: "Technology"
    },
    {
      article_name: "Understanding Flask",
      article_filename: "/assets/flask.png", // Local asset path
      avg_rating: 4.0,
      genre: "Technology"
    },
    // Add more default current reads as needed
  ];

  // Define default past reads
  export const DEFAULT_PAST_READS: ReadArticle[] = [
    {
      article_name: "Advanced JavaScript",
      article_filename: "/assets/javascript.png", // Local asset path
      avg_rating: 5.0,
      genre: "Programming"
    },
    {
      article_name: "CSS Grid Layout",
      article_filename: "/assets/css-grid.png", // Local asset path
      avg_rating: null, // Represents 'No rating'
      genre: "Design"
    },
    // Add more default past reads as needed
  ];

  // Define default article for ArticlePage
  export const DEFAULT_ARTICLE: ArticleData = {
    title: "Default Article",
    extract: "This is a default article used when no specific article data is available.",
    pageUrl: "https://en.wikipedia.org/wiki/Default",
    imageUrl: "/assets/default.png" // Ensure this image exists in public/assets
  };
