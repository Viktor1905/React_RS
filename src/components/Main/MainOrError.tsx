import { ErrorPage } from '../Error/ErrorPage.tsx';
import { Main } from './Main.tsx';
import type { AnimeCharacterArrayResponse } from '../../api/api.ts';

interface Props {
  result: AnimeCharacterArrayResponse | null;
  loading: boolean;
  error: Error | null;
  onRetry: (query: string) => void;
}

export function MainOrErrorPage({ result, loading, error, onRetry }: Props) {
  if (error) {
    return <ErrorPage error={error} onRetry={() => onRetry('luffy')} />;
  }

  return (
    <>
      <Main result={result} loading={loading} />
    </>
  );
}
