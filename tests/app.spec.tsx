import { afterAll, beforeEach, describe, test } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import type { RenderResult } from '@testing-library/react';
import App from '../src/App';
import { mockApi } from './test-utils/mockApi';
import { arrLuffy, arrZoro } from './test-utils/arrays-for-test';

describe('Rendering App', () => {
  const mockError = new Error('API Error');
  let appComponent: RenderResult;
  beforeEach(() => {
    mockApi.success(arrLuffy);
    appComponent = render(<App />);
  });
  afterEach(() => {
    localStorage.clear();
    mockApi.reset();
  });
  test('renders header in App', () => {
    expect(appComponent.getByRole('banner')).toBeInTheDocument();
  });
  test('renders main in App', async () => {
    const { container } = appComponent;
    await waitFor(
      () => {
        expect(container.querySelector(`[class*="spinner"]`)).toBeNull();
        expect(appComponent.getByRole('main')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
  test('render ErrorBtn in App', () => {
    expect(appComponent.getByRole('button', { name: 'Error' }));
  });
  test('on ErrorBtn click intercepted by Error Boundary', () => {
    const btn = appComponent.getByRole('button', { name: 'Error' });
    fireEvent.click(btn);
    expect(appComponent.getByText('Что-то пошло не так.')).toBeInTheDocument();
  });
  test('Error Boundary closed by reset btn click', async () => {
    const btnError = appComponent.getByRole('button', { name: 'Error' });
    fireEvent.click(btnError);
    await waitFor(() => {
      expect(
        appComponent.getByText('Что-то пошло не так.')
      ).toBeInTheDocument();
    });
    const btnReset = appComponent.getByRole('button', {
      name: 'Попробовать снова',
    });
    fireEvent.click(btnReset);
    await waitFor(() => {
      expect(appComponent.queryByText('Что-то пошло не так.')).toBeNull();
      expect(appComponent.findByRole('main')).resolves.toBeInTheDocument();
    });
  });
  test('Error render with bad request', async () => {
    mockApi.error(mockError);
    appComponent = render(<App />);
    await waitFor(
      () => {
        expect(
          appComponent.container.querySelector(`[class*="spinner"]`)
        ).toBeNull();
        expect(
          appComponent.container.querySelector('.error-page')
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
describe('Search part of App and local storage check', async () => {
  let appComponent: RenderResult;
  afterAll(() => {
    localStorage.clear();
    mockApi.reset();
  });
  test.sequential('search luffy', async () => {
    mockApi.mockConditional();
    appComponent = render(<App />);
    const button = appComponent.getByRole('button', { name: /Search/i });
    const input = appComponent.getByPlaceholderText('What you search?');
    fireEvent.change(input, { target: { value: 'zoro' } });
    fireEvent.click(button);
    await waitFor(
      () => {
        expect(
          appComponent.getByText(`${arrZoro.data[0].name}`)
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
  test.sequential('local storage check', async () => {
    appComponent = render(<App />);
    expect(appComponent.getByText(`${arrZoro.data[0].name}`));
  });
});
