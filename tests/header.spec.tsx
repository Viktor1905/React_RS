import { describe, test } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Header } from '../src/components/Header/Header';
import '@testing-library/jest-dom/vitest';
import type { RenderResult } from '@testing-library/react';

describe('header component', (): void => {
  let headerElement: RenderResult;
  beforeEach((): void => {
    headerElement = render(
      <Header
        onSearch={(query: string): string => {
          localStorage.setItem('query', query);
          return query;
        }}
      />
    );
  });
  test('should render header', (): void => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
  test('header has h1 components with text: Search anime character', (): void => {
    expect(headerElement.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Search anime character'
    );
  });
  test('header has input with placeholder: What you search?', (): void => {
    expect(headerElement.getByPlaceholderText('What you search?'));
  });
  test('header has button type: submit and text: Search', (): void => {
    const button: HTMLElement = headerElement.getByRole('button', {
      name: /Search/i,
    });
    expect(button).toHaveAttribute('type', 'submit');
  });
  test('input has changed and button is clicked', async (): Promise<void> => {
    const button: HTMLElement = headerElement.getByRole('button', {
      name: /Search/i,
    });
    const input: HTMLElement =
      headerElement.getByPlaceholderText('What you search?');
    fireEvent.change(input, { target: { value: 'search' } });
    fireEvent.click(button);
    await waitFor(() => expect(localStorage.getItem('query')).toBe('search'));
  });
});
