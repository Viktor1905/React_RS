import { Header } from '../Header/Header';
import { Outlet } from 'react-router';
import { ErrorBtn } from '../Error/ErrorBtn';
import styles from '@/components/Layout/styles/layout.module.css';
import { Main } from '../Main/Main';

export default function Layout() {
  return (
    <>
      <Header />
      <section className={styles.section}>
        <Main />
        <Outlet />
      </section>
      <ErrorBtn />
    </>
  );
}
