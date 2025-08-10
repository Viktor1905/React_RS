import '@testing-library/jest-dom/vitest';
import { createTestStore } from './test-utils/test-store';
import { beforeEach, describe, expect, test } from 'vitest';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '../src/App';
import { Provider } from 'react-redux';
import { arrLuffy } from './test-utils/arrays-for-test';

let luffyItem: HTMLElement;
vi.mock('../src/api/api', async (importOriginal) => {
  const { mockApi } = await import('./test-utils/mockApi');
  return {
    ...(await importOriginal<typeof import('../src/api/api')>()),
    charactersApi: mockApi,
    useGetCharactersQuery: mockApi.useGetCharactersQuery,
    useGetCharacterByIdQuery: mockApi.useGetCharacterByIdQuery,
  };
});
beforeAll(() => {
  vi.mock('../../hooks/useLocalStorage', () => ({
    useLocalStorage: () => ['luffy', vi.fn()],
  }));
});

import {
  resetMockData,
  setMockData,
  setMockDetails,
} from './test-utils/mockApi';

describe('Rendering App', (): void => {
  let appComponent: RenderResult;
  let store: ReturnType<typeof createTestStore>;
  beforeEach(async (): Promise<void> => {
    store = createTestStore();
    const initialEntries = [`/1`];
    resetMockData();
    setMockData(arrLuffy);
    setMockDetails({ data: arrLuffy.data[1] });
    appComponent = render(
      <MemoryRouter initialEntries={initialEntries}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(
      (): void => {
        expect(appComponent.getByText('Luffy Monkey D.')).toBeInTheDocument();
        luffyItem = appComponent.getByText('Luffy Monkey D.');
        fireEvent.click(luffyItem);
      },
      { timeout: 1000 }
    );
  });
  afterEach(() => {
    localStorage.clear();
  });

  test('characterDeatails rendered', async () => {
    setMockData(arrLuffy);
    setMockDetails({ data: arrLuffy.data[1] });
    await waitFor(
      (): void => {
        expect(appComponent.getByTestId('detailed')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
  test('close characterDeatils', async () => {
    setMockData(arrLuffy);
    setMockDetails({ data: arrLuffy.data[1] });
    await waitFor(
      (): void => {
        expect(appComponent.getByTestId('detailed')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
    const button = appComponent.getByRole('button', { name: 'Close' });
    fireEvent.click(button);
    expect(appComponent.queryByTestId('detailed')).toBeNull();
  });
  test('spinner rendered', async () => {
    await waitFor(
      (): void => {
        expect(
          appComponent.getByTestId('character-details-spinner')
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
  test('close characterDeatils if no data', async () => {
    setMockData(arrLuffy);
    setMockDetails(null);
    appComponent = render(
      <MemoryRouter initialEntries={['/1/details/1']}>
        <Provider store={createTestStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(
      (): void => {
        expect(
          appComponent.getByText('Character not found')
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
    const button = appComponent.getByTestId('close-btn-not-found');
    fireEvent.click(button);
    await waitFor(
      (): void => {
        expect(appComponent.queryByText('Character not found')).toBeNull();
      },
      { timeout: 1000 }
    );
  });
  test('should refetch', async (): Promise<void> => {
    let refreshButton: Element;
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    await waitFor(
      () => {
        expect(
          (refreshButton = appComponent.getByTestId(`details-refresh`))
        ).toBeInTheDocument();
        fireEvent.click(refreshButton);
      },
      { timeout: 2000 }
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'charactersApi/invalidateTags',
        payload: [{ type: 'Character', id: 2 }],
      })
    );
  });
});
