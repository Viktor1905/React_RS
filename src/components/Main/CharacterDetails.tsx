import { type ReactElement, useEffect, useState } from 'react';
import {
  type AnimeFullCharacter,
  type AnimeCharacterResponse,
  requestOneCharacter,
} from '../../api/api';
import styles from '@/components/Main/styles/characterDetails.module.css';
import stylesSpinner from '@/components/Main/styles/main.module.css';
import { useSearchParams } from 'react-router';

export function CharacterDetails({ id }: CharacterDetailsProps): ReactElement {
  const [character, setCharacter] = useState<AnimeFullCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setLoading(true);
    requestOneCharacter(id.toString())
      .then((data: AnimeCharacterResponse) => {
        setCharacter(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);
  function closeDetails() {
    searchParams.delete('details');
    setSearchParams(searchParams);
  }
  if (loading)
    return (
      <div
        className={stylesSpinner.spinner}
        data-testid="character-details-spinner"
      ></div>
    );
  if (!character) return <div>Character not found.</div>;
  return (
    <div className={styles.wrapper} data-testid="detailed">
      <div className={styles.close}>
        <button onClick={closeDetails}> Close </button>
      </div>
      <h2>{character.name}</h2>
      <img
        src={character.images.jpg.image_url}
        alt={character.name}
        className={styles.img}
      />
      <p>
        Name kanji:{' '}
        <span className={styles.text}>{character.name_kanji || 'No info'}</span>
      </p>
      <p>
        Anime:{' '}
        <span className={styles.text}>
          {character.anime[0].anime.title || 'No info'}
        </span>
      </p>
      <p>
        About:{' '}
        <span className={styles.text}>{character.about || 'No info'}</span>
      </p>
      <p>
        More info:{' '}
        <a href={character.url} target="_blank" rel="noreferrer">
          Here
        </a>
      </p>
    </div>
  );
}

interface CharacterDetailsProps {
  id: number;
}
