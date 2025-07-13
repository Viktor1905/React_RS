import React from 'react';

interface ErrorPageProps {
  error: Error;
  onRetry: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ error, onRetry }) => (
  <div className="error-page">
    <h2>Something went wrong</h2>
    <p>{error.message}</p>
    <button onClick={onRetry}>Try again</button>
  </div>
);