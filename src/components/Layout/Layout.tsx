import { Header } from '../Header/Header.tsx';
import { Outlet } from 'react-router';
import { ErrorBtn } from '../Error/ErrorBtn.tsx';
import type { AnimeCharacterArrayResponse } from '../../api/api.ts';
import { MainOrErrorPage } from '../Main/MainOrError.tsx';
import styles from '@/components/Layout/styles/layout.module.css';

export default function Layout({
  handleSearch,
  result,
  loading,
  error,
  onRetry,
}: LayoutProps) {
  return (
    <>
      <Header onSearch={handleSearch} />
      <section className={styles.section}>
        <MainOrErrorPage
          result={result}
          loading={loading}
          error={error}
          onRetry={onRetry}
        />
        <Outlet />
      </section>
      <ErrorBtn />
    </>
  );
}
interface LayoutProps {
  handleSearch: (query: string) => void;
  result: AnimeCharacterArrayResponse | null;
  loading: boolean;
  error: Error | null;
  onRetry: (query: string) => void;
}
