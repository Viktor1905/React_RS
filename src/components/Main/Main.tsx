import { type ReactElement } from 'react';
import type { AnimeCharacter, AnimeCharacterResponse } from '../../api/api.ts';
import { CharacterCard } from './CharacterCard.tsx';
import styles from '@/components/Main/styles/main.module.css';

interface MainProps {
  result: AnimeCharacterResponse | null;
  loading: boolean;
}
export function Main({ result, loading }: MainProps): ReactElement {
  if (loading) {
    return (
      <div className={styles.spinner} data-testid="load-spinner-main"></div>
    );
  }
  const isEmpty: number = result?.data.length || 0;
  return (
    <main className={styles.wrapper}>
      {isEmpty && result !== null ? (
        <ul className={styles.list}>
          {result.data.map(
            (char: AnimeCharacter): ReactElement => (
              <CharacterCard key={char.url} character={char}></CharacterCard>
            )
          )}
        </ul>
      ) : (
        <p>No data</p>
      )}
    </main>
  );
}
