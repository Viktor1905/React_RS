import React, { type ReactElement } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface ErrorPageProps {
  error?: FetchBaseQueryError | SerializedError | Error;
  onRetry: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  error,
  onRetry,
}: ErrorPageProps): ReactElement => {
  let errorMessage = 'Something went wrong';

  if (error) {
    if ('message' in error) {
      errorMessage = error.message || errorMessage;
    } else if ('status' in error) {
      errorMessage = `API Error (${error.status})`;
    }
  }

  return (
    <div className="error-page" data-testid="error-page">
      <h2>Something went wrong</h2>
      <p>{errorMessage}</p>
      <button onClick={onRetry}>Try again</button>
    </div>
  );
};
