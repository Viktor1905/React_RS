import './App.css';
import { type ReactElement, useEffect, useState } from 'react';
import { type AnimeCharacterArrayResponse, getCharacters } from './api/api.ts';
import { ErrorBoundary } from './components/Error/ErrorBoundary.tsx';
import { useLocalStorage } from './hooks/useLocalStorage';
import './index.css';
import { Navigate, Route, Routes } from 'react-router';
import { About } from './components/About/About';
import { Page404 } from './components/Page404/Page404';
import Layout from './components/Layout/Layout.tsx';
import { CharacterDetailsWrapper } from './components/CharacterDetailsWrapper/CharacterDetailsWrapper.tsx';

interface AppState {
  result: AnimeCharacterArrayResponse | null;
  loading: boolean;
  hasError: boolean;
  error: Error | null;
}
export default function App(): ReactElement {
  const [storage, setStorage] =
    useLocalStorage<AnimeCharacterArrayResponse | null>('result', null);
  const [state, setState] = useState<AppState>({
    result: storage,
    loading: false,
    hasError: false,
    error: null,
  });
  useEffect((): void => {
    if (!storage) handleSearch('luffy');
  }, []);
  const handleSearch: (query: string) => void = (query: string): void => {
    setState({ ...state, loading: true, error: null });
    setTimeout(
      (): Promise<void> =>
        getCharacters(query)
          .then((data: AnimeCharacterArrayResponse): void => {
            setStorage(data);
            setState((prev: AppState) => ({
              ...prev,
              result: data,
              loading: false,
            }));
          })
          .catch((error: unknown): void => {
            setState((prev: AppState) => ({
              ...prev,
              error:
                error instanceof Error ? error : new Error('Unknown error'),
              loading: false,
            }));
          }),
      1000
    );
  };
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/1" replace />} />
        <Route
          path=":page"
          element={
            <Layout
              handleSearch={handleSearch}
              result={state.result}
              loading={state.loading}
              error={state.error}
              onRetry={handleSearch}
            />
          }
        >
          <Route
            path="details/:id"
            element={<CharacterDetailsWrapper />}
          />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </ErrorBoundary>
  );
}
