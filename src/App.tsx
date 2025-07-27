import './App.css';
import { Header } from './components/Header/Header.tsx';
import { Main } from './components/Main/Main.tsx';
import { type ReactElement, useEffect, useState } from 'react';
import { type AnimeCharacterResponse, requestApi } from './api/api.ts';
import { ErrorBoundary } from './components/Error/ErrorBoundary.tsx';
import { ErrorPage } from './components/Error/ErrorPage.tsx';
import { useLocalStorage } from './hooks/useLocalStorage';
import './index.css';
import { ErrorBtn } from './components/Error/ErrorBtn';
import { Route, Routes } from 'react-router';
import { About } from './components/About/About';
import { Page404 } from './components/Page404/Page404';

interface AppState {
  result: AnimeCharacterResponse | null;
  loading: boolean;
  hasError: boolean;
  error: Error | null;
}
export default function App(): ReactElement {
  const [storage, setStorage] = useLocalStorage<AnimeCharacterResponse | null>(
    'result',
    null
  );
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
        requestApi(query)
          .then((data: AnimeCharacterResponse): void => {
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
  const renderContent = (): ReactElement => {
    const { result, loading, error } = state;
    if (error) {
      return <ErrorPage error={error} onRetry={() => handleSearch('luffy')} />;
    }
    return <Main result={result} loading={loading} />;
  };

  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route
            index
            element={
              <>
                <Header onSearch={handleSearch} />
                {renderContent()}
                <ErrorBtn />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}
