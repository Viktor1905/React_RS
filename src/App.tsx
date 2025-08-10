import './App.css';
import { type ReactElement, useEffect, useState } from 'react';
import { ErrorBoundary } from './components/Error/ErrorBoundary';
import './index.css';
import { Navigate, Route, Routes } from 'react-router';
import { About } from './components/About/About';
import { Page404 } from './components/Page404/Page404';
import Layout from './components/Layout/Layout';
import { CharacterDetailsWrapper } from './components/CharacterDetailsWrapper/CharacterDetailsWrapper';
import { Theme, ThemeToggle } from './context';
import { useAppSelector } from './app/store';
import { PopUp } from './components/PopUp/PopUp';

export default function App(): ReactElement {
  const characters = useAppSelector((state) => state.selectedCharacter);
  const [isLightTheme, setIsLightTheme] = useState(false);
  function toggleTheme() {
    setIsLightTheme(!isLightTheme);
  }

  useEffect(() => {
    lightTheme(isLightTheme);
  }, [isLightTheme]);
  return (
    <ErrorBoundary>
      <Theme value={isLightTheme}>
        <ThemeToggle value={toggleTheme}>
          <Routes>
            <Route path="/" element={<Navigate to="/1" replace />} />
            <Route path=":page" element={<Layout />}>
              <Route path="details/:id" element={<CharacterDetailsWrapper />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          {characters && Object.keys(characters.selected).length > 0 && (
            <PopUp />
          )}
        </ThemeToggle>
      </Theme>
    </ErrorBoundary>
  );
}
function lightTheme(isLight: boolean) {
  document.documentElement.setAttribute(
    'data-theme',
    isLight ? 'light' : 'dark'
  );
  if (isLight) {
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#000';
  } else {
    document.body.style.backgroundColor = '';
    document.body.style.color = '#fff';
  }
}
