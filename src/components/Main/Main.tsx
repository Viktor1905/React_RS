import { type ReactElement } from 'react';
import { CharacterCard } from './CharacterCard';
import styles from '@/components/Main/styles/main.module.css';
import { useNavigate, useParams } from 'react-router';
import { ErrorPage } from '../Error/ErrorPage';
import { charactersApi, useGetCharactersQuery } from '../../api/api';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CharacterSchema } from '../../api/schemas';
import { useDispatch } from 'react-redux';

export function Main(): ReactElement {
  const navigate = useNavigate();
  const { page } = useParams();
  const dispatch = useDispatch();
  const currentPage = page ? parseInt(page) : 1;
  const perPage = 6;
  const [query, setQuery] = useLocalStorage<string | null>('query', 'luffy');
  const { data, error, isLoading } = useGetCharactersQuery(query ?? 'luffy');
  if (isLoading) {
    return (
      <div className={styles.spinner} data-testid="load-spinner-main"></div>
    );
  }
  if (error) {
    return <ErrorPage error={error} onRetry={() => setQuery('luffy')} />;
  }
  if (!data?.data) {
    return <p>No data available</p>;
  }
  const isEmpty: number = data?.data.length ?? 0;
  const totalPages = Math.ceil(isEmpty / perPage);

  const offset = (currentPage - 1) * perPage;
  const currentItems: CharacterSchema[] =
    data.data.slice(offset, offset + perPage) ?? [];

  const handlePageChange = (newPage: number): void => {
    navigate(`/${newPage}`);
  };

  return (
    <main className={styles.wrapper}>
      {isEmpty ? (
        <>
          <div className={styles.section}>
            <button
              className={styles.refresh}
              data-testid="refresh-button"
              onClick={() => {
                dispatch(charactersApi.util.invalidateTags(['List']));
              }}
            >
              {' '}
              Refresh
            </button>
            <ul className={styles.list}>
              {currentItems.map((char: CharacterSchema) => (
                <CharacterCard key={char.url} character={char} />
              ))}
            </ul>
            <div className={styles.pagination} data-testid="pagination">
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
