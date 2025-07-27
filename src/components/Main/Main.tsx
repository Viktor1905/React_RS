import { type ReactElement } from 'react';
import type { AnimeCharacter, AnimeCharacterResponse } from '../../api/api.ts';
import { CharacterCard } from './CharacterCard.tsx';
import styles from '@/components/Main/styles/main.module.css';
import { useSearchParams } from 'react-router';

interface MainProps {
  result: AnimeCharacterResponse | null;
  loading: boolean;
}
export function Main({ result, loading }: MainProps): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || 1;
  const perPage = 6;
  if (loading) {
    return (
      <div className={styles.spinner} data-testid="load-spinner-main"></div>
    );
  }
  const isEmpty: number = result?.data.length || 0;
  const totalPages = Math.ceil(isEmpty / perPage);

  const offset = (pageParam - 1) * perPage;
  const currentItems: AnimeCharacter[] =
    result?.data.slice(offset, offset + perPage) ?? [];

  const handlePageChange = (page: number): void => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <main className={styles.wrapper}>
      {isEmpty && result !== null ? (
        <>
          <ul className={styles.list}>
            {currentItems.map(
              (char: AnimeCharacter): ReactElement => (
                <CharacterCard key={char.url} character={char} />
              )
            )}
          </ul>

          <div className={styles.pagination}>
            {Array.from(
              { length: totalPages },
              (_, i): ReactElement => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  disabled={pageParam === i + 1}
                  className={
                    pageParam === i + 1 ? styles.activeBtn : styles.pageBtn
                  }
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </>
      ) : (
        <p>No data</p>
      )}
    </main>
  );
}
