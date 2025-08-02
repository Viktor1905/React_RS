import { type ReactElement, useContext } from 'react';
import { Theme, ThemeToggle } from '../../../../context.ts';
import sun from './assets/sun.svg';
import moon from './assets/moon.svg';
import styles from './styles.module.css';

export function GetThemeButton(): ReactElement {
  const toggleTheme: () => void = useContext(ThemeToggle);
  const theme: boolean = useContext(Theme);
  const icon: string = theme ? sun : moon;
  return (
    <div onClick={toggleTheme} className={styles.button}>
      <img src={icon} alt={'theme-toggle'} />
    </div>
  );
}
