// home_style.ts

export const container = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    width: '100%',
    overflowX: 'hidden', // Prevent horizontal scroll on the entire page
  } as React.CSSProperties;

  export const content = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  } as React.CSSProperties;

  export const header = {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
  } as React.CSSProperties;

  export const section = {
    marginTop: '2rem',
  } as React.CSSProperties;

  export const scrollableCardContainer = {
    display: 'flex',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    paddingBottom: '1rem',
    gap: '1rem',
    scrollbarWidth: 'none', // For Firefox
    msOverflowStyle: 'none', // For IE and Edge
  } as React.CSSProperties;

  export const card = {
    flex: '0 0 auto',
    width: '200px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  } as React.CSSProperties;

  export const cardImage = {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
  } as React.CSSProperties;

  export const cardTitle = {
    padding: '1rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textAlign: 'center',
  } as React.CSSProperties;

  export const cardRating = {
    textAlign: 'center',
    padding: '0 1rem 1rem 1rem',
    color: '#f39c12',
  } as React.CSSProperties;
