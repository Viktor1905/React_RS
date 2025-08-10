import styles from '@/components/Header/styles/header.module.css';
import {
  type ChangeEvent,
  type FormEvent,
  type ReactElement,
  useRef,
  useState,
} from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { NavLink, useNavigate } from 'react-router';
import { GetThemeButton } from './components/ThemeButton/ThemeButton';

export function Header(): ReactElement {
  const [search, setSearch] = useLocalStorage<string>('query', 'luffy');
  const [inputValue, setInputValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (inputRef.current && inputRef.current.value) {
      const inputValue = inputRef.current.value;
      event.preventDefault();
      setSearch(inputValue);
      navigate('/');
    }
  }
  return (
    <header>
      <div className={styles.themeWrapper}>
        <GetThemeButton />
      </div>
      <h1>Search anime character</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <NavLink to="/about">
          <button className={styles.buttonAbout} type={'button'}>
            About
          </button>
        </NavLink>
        <input
          ref={inputRef}
          placeholder="What you search?"
          className={styles.input}
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </header>
  );
}
