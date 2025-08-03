import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect, test } from 'vitest';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { mockApi } from './test-utils/mockApi';
import { arrLuffy } from './test-utils/arrays-for-test';
import { MemoryRouter } from 'react-router';
import App from '../src/App';
import store from '../src/app/store';
import { Provider } from 'react-redux';
let luffyItem: HTMLElement;
describe('Rendering App', (): void => {
  let appComponent: RenderResult;
  beforeEach(async (): Promise<void> => {
    mockApi.success(arrLuffy);
    const initialEntries = [`/1/details/${arrLuffy.data[1].mal_id}`];
    appComponent = render(
      <>
        <MemoryRouter initialEntries={initialEntries}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      </>
    );
    await waitFor(
      (): void => {
        expect(appComponent.getByText('Luffy Monkey D.')).toBeInTheDocument();
        luffyItem = appComponent.getByText('Luffy Monkey D.');
        fireEvent.click(luffyItem);
      },
      { timeout: 2000 }
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('characterDeatils rendered', async () => {
    await waitFor(
      (): void => {
        expect(appComponent.getByTestId('detailed')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
  test('spinner rendered', async () => {
    expect(
      appComponent.getByTestId('character-details-spinner')
    ).toBeInTheDocument();
  });
  test('close characterDeatils', async () => {
    await waitFor(
      (): void => {
        expect(appComponent.getByTestId('detailed')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
    const button = appComponent.getByRole('button', { name: 'Close' });
    fireEvent.click(button);
    expect(appComponent.queryByTestId('detailed')).toBeNull();
  });
});
