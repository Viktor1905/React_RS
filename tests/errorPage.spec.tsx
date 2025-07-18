import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, test } from 'vitest';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { ErrorPage } from '../src/components/Error/ErrorPage';

const errorElem = { name: 'Error', message: 'Error text' };
describe('errorPage component', () => {
  let errorPage: RenderResult;
  const handleClick = vi.fn();
  beforeEach(() => {
    errorPage = render(<ErrorPage error={errorElem} onRetry={handleClick} />);
  });
  test('should render errorPage', () => {
    const { container } = errorPage;
    expect(container.querySelector('.error-page')).toBeInTheDocument();
  });
  test('should render error message', () => {
    expect(errorPage.getByText(errorElem.message)).toBeInTheDocument();
  });
  test('should render btn', () => {
    expect(
      errorPage.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument();
  });
  test('btn must work onClick', () => {
    const btn = errorPage.getByRole('button', { name: 'Try again' });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
  });
});
