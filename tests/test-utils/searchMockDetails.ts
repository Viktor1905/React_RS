import { arrLuffy } from './arrays-for-test';

let params = new URLSearchParams();

export const mockSetSearchParams = vi.fn((newParams) => {
  if (newParams instanceof URLSearchParams) {
    params = new URLSearchParams(newParams.toString());
  } else if (typeof newParams === 'string') {
    params = new URLSearchParams(newParams);
  } else if (typeof newParams === 'object' && newParams !== null) {
    params = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (value != null) params.set(key, value.toString());
    });
  }
  return params;
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => {
      const params = new URLSearchParams();
      params.set('details', String(arrLuffy.data[1].mal_id));
      return [params, vi.fn()];
    },
  };
});
