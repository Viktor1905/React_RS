import styles from '@/components/Header/styles/header.module.css';
import {
  type ChangeEvent,
  type FormEvent,
  type ReactElement,
  useState,
} from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
interface HeaderProps {
  onSearch: (q: string) => void;
}

export function Header({ onSearch }: HeaderProps): ReactElement {
  const [search, setSearch] = useLocalStorage<string | null>('query', null);
  const [queryState, setQueryState] = useState<string>(search || '');
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setQueryState(event.target.value);
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch(queryState);
    onSearch(queryState);
  }
  return (
    <header>
      <h1>Search anime character</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
