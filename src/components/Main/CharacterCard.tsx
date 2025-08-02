import { type ReactElement } from 'react';
import { type AnimeCharacter } from '../../api/api.ts';
import styles from '@/components/Main/styles/character.module.css';
import { useNavigate, useParams } from 'react-router';

interface CardState {
  character: AnimeCharacter;
}
export function CharacterCard({ character }: CardState): ReactElement {
  const navigate = useNavigate();
  const { page } = useParams();
  const currentPage = page ? parseInt(page) : 1;

  function handleClick(): void {
    navigate(`/${currentPage}/details/${character.mal_id}`);
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
