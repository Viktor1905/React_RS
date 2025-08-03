import './App.css';
import { type ReactElement, useEffect, useState } from 'react';
import { type AnimeCharacterArrayResponse, getCharacters } from './api/api';
import { ErrorBoundary } from './components/Error/ErrorBoundary';
import { useLocalStorage } from './hooks/useLocalStorage';
import './index.css';
import { Navigate, Route, Routes } from 'react-router';
import { About } from './components/About/About';
import { Page404 } from './components/Page404/Page404';
import Layout from './components/Layout/Layout';
import { CharacterDetailsWrapper } from './components/CharacterDetailsWrapper/CharacterDetailsWrapper';
import { Theme, ThemeToggle } from './context';
import { useAppSelector } from './app/store';
import { PopUp } from './components/PopUp/PopUp';

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
  const characters = useAppSelector((state) => state.selectedCharacter);
  useEffect((): void => {
    if (!storage) handleSearch('luffy');
  }, []);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  function toggleTheme() {
    lightTheme(!isDarkTheme);
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.setAttribute(
      'data-theme',
      isDarkTheme ? '' : 'light'
    );
  }
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
      <Theme value={isDarkTheme}>
        <ThemeToggle value={toggleTheme}>
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
              <Route path="details/:id" element={<CharacterDetailsWrapper />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          {Object.keys(characters.selected).length > 0 && <PopUp />}
        </ThemeToggle>
      </Theme>
    </ErrorBoundary>
  );
}
function lightTheme(isDark: boolean) {
  if (isDark) {
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#000';
  } else {
    document.body.style.backgroundColor = '';
    document.body.style.color = '#fff';
  }
}
