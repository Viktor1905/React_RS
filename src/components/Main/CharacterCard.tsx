import { type ReactElement, useRef } from 'react';
import { type AnimeCharacter } from '../../api/api';
import styles from '@/components/Main/styles/character.module.css';
import { useNavigate, useParams } from 'react-router';
import {
  addCharacter,
  removeCharacter,
  useAppDispatch,
  useAppSelector,
} from '../../app/store';

interface CardState {
  character: AnimeCharacter;
}
export function CharacterCard({ character }: CardState): ReactElement {
  const navigate = useNavigate();
  const allSelectedCharacter = useAppSelector(
    (state) => state.selectedCharacter
  );
  const characterIsSelected =
    !!allSelectedCharacter.selected[String(character.mal_id)];
  const dispatch = useAppDispatch();
  const { page } = useParams();
  const currentPage = page ? parseInt(page) : 1;
  const checkboxRef = useRef<HTMLInputElement>(null);
  function handleClick(event: React.MouseEvent<HTMLLIElement>): void {
    if (event.target !== checkboxRef.current) {
      navigate(`/${currentPage}/details/${character.mal_id}`);
    }
  }
  function manageCharacter(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    if (checked) {
      dispatch(
        addCharacter({
          id: character.mal_id,
          name: character.name,
          photo: character.images.jpg.image_url,
          about: character.description
            ? character.description
            : 'No information',
        })
      );
    } else {
      dispatch(removeCharacter(String(character.mal_id)));
    }
  }
  return (
    <li className={styles.card} onClick={handleClick}>
      <input
        type={'checkbox'}
        ref={checkboxRef}
        className={styles.check}
        onChange={manageCharacter}
        checked={characterIsSelected}
      />
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
