import React, { type ReactElement } from 'react';

interface ErrorPageProps {
  error: Error;
  onRetry: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  error,
  onRetry,
}: ErrorPageProps): ReactElement => (
  <div className="error-page" data-testid="error-page">
    <h2>Something went wrong</h2>
    <p>{error.message}</p>
    <button onClick={onRetry}>Try again</button>
  </div>
);
