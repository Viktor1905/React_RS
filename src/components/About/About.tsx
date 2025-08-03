import { type ReactElement } from 'react';
import { NavLink } from 'react-router';
import styles from '@/components/About/styles/about.module.css';

export function About(): ReactElement {
  return (
    <div data-testid="about-page">
      <h1>About</h1>
      <p>Hello, my name is Victor and this is my learning project.</p>
      <p>
        Link to course:{' '}
        <a href="https://rs.school/courses/reactjs">RS School Course</a>
      </p>
      <NavLink to={'/'} className={styles.back}>
        <button>Back</button>
      </NavLink>
    </div>
  );
}
