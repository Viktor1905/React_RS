import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, test } from 'vitest';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { ErrorPage } from '../src/components/Error/ErrorPage';

describe('errorPage component', (): void => {
  const errorElem = { name: 'Error', message: 'Error text' };
  let errorPage: RenderResult;
  const handleClick = vi.fn();
  beforeEach((): void => {
    errorPage = render(<ErrorPage error={errorElem} onRetry={handleClick} />);
  });
  test('should render errorPage', (): void => {
    expect(errorPage.getByTestId('error-page')).toBeInTheDocument();
  });
  test('should render error message', (): void => {
    expect(errorPage.getByText(errorElem.message)).toBeInTheDocument();
  });
  test('should render btn', (): void => {
    expect(
      errorPage.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument();
  });
  test('btn must work onClick', (): void => {
    const btn: HTMLElement = errorPage.getByRole('button', {
      name: 'Try again',
    });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
  });
});
