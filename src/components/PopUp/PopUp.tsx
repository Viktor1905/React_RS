import { ReactElement, useEffect, useState } from 'react';
import {
  clearCharacters,
  useAppDispatch,
  useAppSelector,
} from '../../app/store';
import styles from './styles/style.module.css';

export function PopUp(): ReactElement {
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.selectedCharacter);
  const [url, setUrl] = useState<string>('');
  const [linkName, setLinkName] = useState<string>('');
  useEffect(() => {
    const headers = ['id', 'name', 'photo', 'about'];
    const rows = Object.values(characters.selected).map((character) => {
      return Object.values(character);
    });
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    setUrl(URL.createObjectURL(blob));
    setLinkName(`${Object.values(characters.selected).length}_items`);
  }, [characters]);
  return (
    <div className={styles.wrapper}>
      <button className={styles.button}>
        <a href={url} className={styles.link} download={linkName}>
          Download
        </a>
      </button>
      <div>Selected {Object.values(characters.selected).length} character</div>
      <button
        className={styles.button}
        onClick={() => dispatch(clearCharacters())}
      >
        Delete All
      </button>
    </div>
  );
}
