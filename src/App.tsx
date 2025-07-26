import './App.css';
import { Header } from './components/Header/Header.tsx';
import { Main } from './components/Main/Main.tsx';
import { ErrorBtn } from './components/Error/ErrorBtn.tsx';
import { useEffect, useState } from 'react';
import { type AnimeCharacterResponse, requestApi } from './api/api.ts';
import { ErrorBoundary } from './components/Error/ErrorBoundary.tsx';
import { ErrorPage } from './components/Error/ErrorPage.tsx';
import { useLocalStorage } from './hooks/useLocalStorage';

interface AppState {
  result: AnimeCharacterResponse | null;
  loading: boolean;
  hasError: boolean;
  error: Error | null;
}
function App() {
  const [storage] = useLocalStorage('result');
  const [state, setState] = useState<AppState>({
    result: storage,
    loading: false,
    hasError: false,
    error: null,
  });
  useEffect((): void => {
    if (!storage) handleSearch('luffy');
  }, []);
  const handleSearch: (query: string) => void = (query: string) => {
    setState({ ...state, loading: true, error: null });
    setTimeout(
      () =>
        requestApi(query)
          .then((data) => {
            localStorage.setItem('result', JSON.stringify(data));
            return setState({ ...state, result: data, loading: false });
          })
          .catch((error: unknown): void => {
            setState({
              ...state,
              error:
                error instanceof Error ? error : new Error('Unknown error'),
              loading: false,
            });
          }),
      1000
    );
  };
  const renderContent = () => {
    const { result, loading, error } = state;
    if (error) {
      return <ErrorPage error={error} onRetry={() => handleSearch('luffy')} />;
    }
    return <Main result={result} loading={loading} />;
  };

  return (
    <>
      <ErrorBoundary>
        <Header onSearch={handleSearch} />
        {renderContent()}
        <ErrorBtn />
      </ErrorBoundary>
    </>
  );
};

export default App;
