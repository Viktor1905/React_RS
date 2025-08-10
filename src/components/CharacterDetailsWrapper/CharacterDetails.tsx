import { type ReactElement } from 'react';
import styles from '@/components/CharacterDetailsWrapper/styles/characterDetails.module.css';
import stylesSpinner from '@/components/Main/styles/main.module.css';
import { useNavigate, useParams } from 'react-router';
import { charactersApi, useGetCharacterByIdQuery } from '../../api/api';
import { useDispatch } from 'react-redux';

export function CharacterDetails({ id }: CharacterDetailsProps): ReactElement {
  const { data, isLoading, error } = useGetCharacterByIdQuery(id.toString());
  const { page } = useParams();
  const dispatch = useDispatch();
  const currentPage = page ? parseInt(page) : 1;
  const navigate = useNavigate();
  function closeDetails() {
    navigate(`/${currentPage}/`);
  }
  if (isLoading)
    return (
      <div
        className={stylesSpinner.spinner}
        data-testid="character-details-spinner"
      ></div>
    );
  if (error) return <div>Error loading character</div>;
  if (!data?.data)
    return (
      <div>
        <div className={styles.close}>
          <button onClick={closeDetails} data-testid="close-btn-not-found">
            {' '}
            Close{' '}
          </button>
        </div>
        Character not found
      </div>
    );
  const { url, anime, name, name_kanji, about, images } = data.data;

  return (
    <div className={styles.wrapper} data-testid="detailed">
      <div className={styles.close}>
        <button
          className={styles.refresh}
          data-testId="details-refresh"
          onClick={() =>
            dispatch(
              charactersApi.util.invalidateTags([{ type: 'Character', id }])
            )
          }
        >
          {' '}
          Refresh
        </button>
        <button onClick={closeDetails}> Close </button>
      </div>
      <h2>{name}</h2>
      <img src={images.jpg.image_url} alt={name} className={styles.img} />
      <p>
        Name kanji:{' '}
        <span className={styles.text}>{name_kanji || 'No info'}</span>
      </p>
      <p>
        Anime:{' '}
        <span className={styles.text}>
          {anime[0] ? anime[0].anime.title : 'No info'}
        </span>
      </p>
      <p>
        About: <span className={styles.text}>{about || 'No info'}</span>
      </p>
      <p>
        More info:{' '}
        <a href={url} target="_blank" rel="noreferrer">
          Here
        </a>
      </p>
    </div>
  );
}

interface CharacterDetailsProps {
  id: number;
}
