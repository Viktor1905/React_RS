import '@testing-library/jest-dom/vitest';
import { beforeAll, beforeEach, describe, expect } from 'vitest';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { Main } from '../src/components/Main/Main';
import { arrLuffy, arrZoro } from './test-utils/arrays-for-test';
import { MemoryRouter, useLocation } from 'react-router';
import { Provider } from 'react-redux';
import { resetMockData, setMockData } from './test-utils/mockApi';
import App from '../src/App';
import { createTestStore } from './test-utils/test-store';
vi.mock('../src/api/api', async (importOriginal) => {
  const { mockApi } = await import('./test-utils/mockApi');
  return {
    ...(await importOriginal<typeof import('../src/api/api')>()),
    charactersApi: mockApi,
    useGetCharactersQuery: mockApi.useGetCharactersQuery,
    useGetCharacterByIdQuery: mockApi.useGetCharacterByIdQuery,
  };
});
const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};
describe('Main component', (): void => {
  let store: ReturnType<typeof createTestStore>;
  let mainComponent: RenderResult;
  beforeEach(() => {
    store = createTestStore();
    localStorage.clear();
    mainComponent = render(
      <MemoryRouter initialEntries={['/1']}>
        <Provider store={store}>
          <App />
          <LocationDisplay />
        </Provider>
      </MemoryRouter>
    );
  });
  beforeAll(() => {
    vi.mock('../../hooks/useLocalStorage', () => ({
      useLocalStorage: () => [null, vi.fn()],
    }));
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('should render main', async (): Promise<void> => {
    setMockData(arrLuffy);
    await waitFor(
      () => expect(mainComponent.getByRole('main')).toBeInTheDocument(),
      { timeout: 1000 }
    );
  });
  test('render has list', async (): Promise<void> => {
    await waitFor(
      () => expect(mainComponent.getByRole('list')).toBeInTheDocument(),
      { timeout: 1000 }
    );
  });
  test('debug API mock', async () => {
    setMockData(arrLuffy);
  });
  test('should render is No data', async (): Promise<void> => {
    resetMockData();
    await waitFor(
      () => {
        expect(
          mainComponent.getByText('No data available')
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
  test('should render spinner', (): void => {
    setMockData(arrLuffy);
    const spinner: Element = mainComponent.getByTestId(`load-spinner-main`);
    expect(spinner).toBeInTheDocument();
  });
  test.fails('should render another array', (): void => {
    setMockData(arrZoro);
    const newMainComponent = render(
      <MemoryRouter>
        <Main />
        <LocationDisplay />
      </MemoryRouter>
    );
    expect(mainComponent).toEqual(newMainComponent);
  });
  test('should refetch', async (): Promise<void> => {
    let refreshButton: Element;
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    await waitFor(
      () => {
        expect(
          (refreshButton = mainComponent.getByTestId(`refresh-button`))
        ).toBeInTheDocument();
        fireEvent.click(refreshButton);
      },
      { timeout: 2000 }
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: expect.stringContaining('invalidateTags'),
        payload: ['List'],
      })
    );
  });
  test('should navigate', async (): Promise<void> => {
    setMockData(arrLuffy);
    expect(mainComponent.getByTestId('location-display').textContent).toBe(
      '/1'
    );
    await waitFor(
      () => {
        const page2Btn = mainComponent.getByRole('button', { name: '2' });
        expect(page2Btn).toBeInTheDocument();
        fireEvent.click(page2Btn);
      },
      { timeout: 2000 }
    );
    expect(mainComponent.getByTestId('location-display').textContent).toBe(
      '/2'
    );
  });
});
