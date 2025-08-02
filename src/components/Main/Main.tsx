import { type ReactElement } from 'react';
import type {
  AnimeCharacter,
  AnimeCharacterArrayResponse,
} from '../../api/api.ts';
import { CharacterCard } from './CharacterCard.tsx';
import styles from '@/components/Main/styles/main.module.css';
import { useNavigate, useParams } from 'react-router';

interface MainProps {
  result: AnimeCharacterArrayResponse | null;
  loading: boolean;
}

export function Main({ result, loading }: MainProps): ReactElement {
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page ? parseInt(page) : 1;
  const perPage = 6;

  if (loading) {
    return (
      <div className={styles.spinner} data-testid="load-spinner-main"></div>
    );
  }

  const isEmpty: number = result?.data.length || 0;
  const totalPages = Math.ceil(isEmpty / perPage);

  const offset = (currentPage - 1) * perPage;
  const currentItems: AnimeCharacter[] =
    result?.data.slice(offset, offset + perPage) ?? [];

  const handlePageChange = (newPage: number): void => {
    navigate(`/${newPage}`);
  };

  return (
    <main className={styles.wrapper}>
      {isEmpty && result !== null ? (
        <>
          <div className={styles.section}>
            <ul className={styles.list}>
              {currentItems.map((char: AnimeCharacter) => (
                <CharacterCard key={char.url} character={char} />
              ))}
            </ul>
            <div className={styles.pagination}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  disabled={currentPage === i + 1}
                  className={
                    currentPage === i + 1 ? styles.activeBtn : styles.pageBtn
                  }
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>No data</p>
      )}
    </main>
  );
}
