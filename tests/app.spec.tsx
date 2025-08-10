import { afterAll, beforeEach, describe, test } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import type { RenderResult } from '@testing-library/react';
import App from '../src/App';
import { resetMockData, setDelay, setMockData } from './test-utils/mockApi';
import { arrLuffy, arrZoro } from './test-utils/arrays-for-test';
import { MemoryRouter, useLocation } from 'react-router';
import type { Location } from 'react-router';
import { useEffect } from 'react';
import store from '../src/app/store';
import { Provider } from 'react-redux';
vi.mock('../src/api/api', async (importOriginal) => {
  const { mockApi } = await import('./test-utils/mockApi');
  return {
    ...(await importOriginal<typeof import('../src/api/api')>()),
    charactersApi: mockApi,
    useGetCharactersQuery: mockApi.useGetCharactersQuery,
    useGetCharacterByIdQuery: mockApi.useGetCharacterByIdQuery,
  };
});

describe('Rendering App', (): void => {
  let appComponent: RenderResult;

  beforeEach((): void => {
    setMockData(arrLuffy);
    appComponent = render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
  });
  afterEach((): void => {
    localStorage.clear();
    resetMockData();
  });
  test('renders header in App', (): void => {
    expect(appComponent.getByRole('banner')).toBeInTheDocument();
  });
  test('renders main in App', async (): Promise<void> => {
    setDelay(1000);
    const spinner: Element = appComponent.getByTestId(`load-spinner-main`);
    expect(spinner).toBeInTheDocument();
    await waitFor(
      (): void => {
        expect(appComponent.getByRole('main')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
    setDelay(0);
  });
  test('render ErrorBtn in App', (): void => {
    expect(appComponent.getByRole('button', { name: 'Error' }));
  });
  test('on ErrorBtn click intercepted by Error Boundary', (): void => {
    const btn: HTMLElement = appComponent.getByRole('button', {
      name: 'Error',
    });
    fireEvent.click(btn);
    expect(appComponent.getByText('Что-то пошло не так.')).toBeInTheDocument();
  });
  test('Error Boundary closed by reset btn click', async (): Promise<void> => {
    const btnError: HTMLElement = appComponent.getByRole('button', {
      name: 'Error',
    });
    fireEvent.click(btnError);
    await waitFor((): void => {
      expect(
        appComponent.getByText('Что-то пошло не так.')
      ).toBeInTheDocument();
    });
    const btnReset: HTMLElement = appComponent.getByRole('button', {
      name: 'Попробовать снова',
    });
    fireEvent.click(btnReset);
    await waitFor((): void => {
      expect(appComponent.queryByText('Что-то пошло не так.')).toBeNull();
      expect(appComponent.findByRole('main')).resolves.toBeInTheDocument();
    });
  });
});
describe('Search part of App and local storage check', async (): Promise<void> => {
  let appComponent: RenderResult;
  afterAll(() => {
    localStorage.clear();
    resetMockData();
  });
  test.sequential('search zoro', async (): Promise<void> => {
    const locationRef = { current: null as Location | null };
    function LocationDisplay() {
      const location = useLocation();
      useEffect(() => {
        locationRef.current = location;
      }, [location]);
      return null;
    }
    setMockData(arrZoro);
    appComponent = render(
      <MemoryRouter initialEntries={['/1/details/' + arrZoro.data[0].mal_id]}>
        <Provider store={store}>
          <App />
          <LocationDisplay />
        </Provider>
      </MemoryRouter>
    );
    const button: HTMLElement = appComponent.getByRole('button', {
      name: /Search/i,
    });
    const input: HTMLElement =
      appComponent.getByPlaceholderText('What you search?');
    fireEvent.change(input, { target: { value: 'zoro' } });
    fireEvent.click(button);
    await waitFor(
      (): void => {
        expect(
          appComponent.getByText(`${arrZoro.data[0].name}`)
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
    fireEvent.click(appComponent.getByText(`${arrZoro.data[0].name}`));
    expect(locationRef.current?.pathname).toBe(
      `/1/details/${arrZoro.data[0].mal_id}`
    );
  });
  test.sequential('local storage check', async (): Promise<void> => {
    appComponent = render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(appComponent.getByText(`${arrZoro.data[0].name}`));
  });
});
