import { beforeEach, describe, test } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import type { RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Page404 } from '../src/components/Page404/Page404';

describe('Rendering 404Page', (): void => {
  let appComponent: RenderResult;
  beforeEach((): void => {
    appComponent = render(
      <MemoryRouter>
        <Page404 />
      </MemoryRouter>
    );
  });
  test('renders 404Page', (): void => {
    expect(appComponent.getByText('Page 404')).toBeInTheDocument();
  });
});
