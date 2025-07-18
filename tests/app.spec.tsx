import { beforeEach, describe, test } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import type { RenderResult } from '@testing-library/react';
import App from '../src/App';
import { mockApi } from './test-utils/mockApi';
import { arrLuffy } from './test-utils/arrays-for-test';

describe('Rendering App', () => {
  let appComponent: RenderResult;
  beforeEach(() => {
    mockApi.success(arrLuffy);
    appComponent = render(<App />);
  });
  afterEach(() => {
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
});
