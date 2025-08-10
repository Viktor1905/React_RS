import { beforeEach, describe, test } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import type { RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { About } from '../src/components/About/About';

describe('Rendering AboutPage', (): void => {
  let appComponent: RenderResult;
  beforeEach((): void => {
    appComponent = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
  });
  test('renders aboutPage', (): void => {
    expect(appComponent.getByTestId('about-page')).toBeInTheDocument();
  });
});
