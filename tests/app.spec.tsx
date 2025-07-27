import { afterAll, beforeEach, describe, test } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import type { RenderResult } from '@testing-library/react';
import App from '../src/App';
import { mockApi } from './test-utils/mockApi';
import { arrLuffy, arrZoro } from './test-utils/arrays-for-test';
import { MemoryRouter } from 'react-router';

describe('Rendering App', (): void => {
  const mockError = new Error('API Error');
  let appComponent: RenderResult;
  beforeEach((): void => {
    mockApi.success(arrLuffy);
    appComponent = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
  afterEach((): void => {
    localStorage.clear();
    mockApi.reset();
  });
  test('renders header in App', (): void => {
    expect(appComponent.getByRole('banner')).toBeInTheDocument();
  });
  test('renders main in App', async (): Promise<void> => {
    const spinner: Element = appComponent.getByTestId(`load-spinner-main`);
    expect(spinner).toBeInTheDocument();
    await waitFor(
      (): void => {
        expect(appComponent.getByRole('main')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
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
  test('Error render with bad request', async (): Promise<void> => {
    mockApi.error(mockError);
    appComponent = render(<App />);
    await waitFor(
      (): void => {
        expect(appComponent.getByTestId('error-page')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
describe('Search part of App and local storage check', async (): Promise<void> => {
  let appComponent: RenderResult;
  afterAll(() => {
    localStorage.clear();
    mockApi.reset();
  });
  test.sequential('search luffy', async (): Promise<void> => {
    mockApi.mockConditional();
    appComponent = render(
      <MemoryRouter>
        <App />
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
  });
  test.sequential('local storage check', async (): Promise<void> => {
    appComponent = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(appComponent.getByText(`${arrZoro.data[0].name}`));
  });
});
