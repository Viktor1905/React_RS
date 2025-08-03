import { beforeEach, describe, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
  within,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../src/app/store';
import { arrLuffy } from './test-utils/arrays-for-test';
import { mockApi } from './test-utils/mockApi';
import App from '../src/App';

describe('PopUp Component', () => {
  let appComponent: RenderResult;
  let checkbox: HTMLElement | null = null;
  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'mock-url');
    global.URL.revokeObjectURL = vi.fn();
  });
  afterAll(() => {
    vi.restoreAllMocks();
  });
  beforeEach(async (): Promise<void> => {
    mockApi.success(arrLuffy);
    appComponent = render(
      <>
        <MemoryRouter initialEntries={['/']}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>
      </>
    );
    await waitFor(
      (): void => {
        const luffyText = appComponent.getByText('Luffy Monkey D.');
        const luffyComponent = luffyText.closest('li');
        if (!luffyComponent) {
          throw new Error('Card element not found for Luffy');
        }
        const { getByRole } = within(luffyComponent);
        checkbox = getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
      },
      { timeout: 2000 }
    );
  });
  test('should render correctly', async () => {
    const popUp = await appComponent.findByTestId('popUp');
    expect(popUp).toBeInTheDocument();
  });
  test('should delete correctly', async () => {
    const popUp = await appComponent.findByTestId('popUp');
    expect(popUp).toBeInTheDocument();
    if (!checkbox) {
      throw new Error('Checkbox not found');
    }
    fireEvent.click(checkbox);
    expect(appComponent.queryByTestId('popUp')).toBeNull();
  });
  test('should clear store', async () => {
    const popUp = await appComponent.findByTestId('popUp');
    const { getByRole } = within(popUp);
    const deleteButton = getByRole('button', { name: 'Delete All' });
    fireEvent.click(deleteButton);
    expect(appComponent.queryByTestId('popUp')).toBeNull();
  });
  test('should download store', async () => {
    const popUp = await appComponent.findByTestId('popUp');
    const { getByRole } = within(popUp);
    const downloadButton = getByRole('link', { name: 'Download' });
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).toHaveAttribute('href', 'mock-url');
    expect(downloadButton).toHaveAttribute('download', '1_items');
    fireEvent.click(downloadButton);
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });
});
