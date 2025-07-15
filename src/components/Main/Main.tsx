import { Component, type ReactElement } from 'react';
import type { AnimeCharacter, AnimeCharacterResponse } from '../../api/api.ts';
import { CharacterCard } from './CharacterCard.tsx';
import styles from '@/components/Main/styles/main.module.css';

interface MainState {
  result: AnimeCharacterResponse | null;
  loading: boolean;
}
export class Main extends Component<MainState> {
  state: MainState = {
    loading: this.props.loading,
    result: null,
  };
  render(): ReactElement {
    if (this.props.loading) {
      return <div className={styles.spinner}></div>;
    }
    const { result } = this.props;
    const isEmpty = result?.data.length;
    return (
      <main className={styles.wrapper}>
        {isEmpty ? (
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
}
