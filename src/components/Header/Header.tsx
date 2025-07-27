import styles from '@/components/Header/styles/header.module.css';
import {
  type ChangeEvent,
  type FormEvent,
  type ReactElement,
  useEffect,
  useState,
} from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { NavLink, useSearchParams } from 'react-router';
interface HeaderProps {
  onSearch: (q: string) => void;
}

export function Header({ onSearch }: HeaderProps): ReactElement {
  const [search, setSearch] = useLocalStorage<string>('query', '');
  const [queryState, setQueryState] = useState<string>(search);
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setQueryState(event.target.value);
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch(queryState);
    searchParams.set('search', queryState);
    setSearchParams(searchParams);
    onSearch(queryState);
  }
  useEffect(() => {
    setQueryState(search);
  }, [search]);
  return (
    <header>
      <h1>Search anime character</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <NavLink to="/about">
          <button className={styles.buttonAbout} type={'button'}>
            About
          </button>
        </NavLink>
        <input
          placeholder="What you search?"
          className={styles.input}
          value={queryState}
          onChange={handleChange}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </header>
  );
}
