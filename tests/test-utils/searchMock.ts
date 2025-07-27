import * as reactRouter from 'react-router';

export const mockSetSearchParams = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof reactRouter>('react-router');
  return {
    ...actual,
    useSearchParams: () => {
      const params = new URLSearchParams();
      return [params, mockSetSearchParams];
    },
  };
});
