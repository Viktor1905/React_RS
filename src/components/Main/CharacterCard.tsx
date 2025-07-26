import { type ReactElement } from 'react';
import type { AnimeCharacter } from '../../api/api.ts';
import styles from '@/components/Main/styles/character.module.css';

interface CardState {
  character: AnimeCharacter;
}
export function CharacterCard({ character }: CardState): ReactElement {
  return (
    <li className={styles.card}>
      <img
        src={character.images.jpg.image_url}
        className={styles.img}
        alt="image"
      />
      <div>{character.name}</div>
      <div>
        More info:
        <a href={character.url}> Here</a>
      </div>
    </li>
  );
}
