import { type ReactElement } from 'react';
import { type AnimeCharacter } from '../../api/api.ts';
import styles from '@/components/Main/styles/character.module.css';
import { useSearchParams } from 'react-router';

interface CardState {
  character: AnimeCharacter;
}
export function CharacterCard({ character }: CardState): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(): void {
    searchParams.set('details', character.mal_id);
    setSearchParams(searchParams);
  }
  return (
    <li className={styles.card} onClick={handleClick}>
      <img
        src={character.images.jpg.image_url}
        className={styles.img}
        alt="image"
      />
      <div>{character.name}</div>
      <div>
        More info in other site:
        <a href={character.url}> Here</a>
      </div>
    </li>
  );
}
