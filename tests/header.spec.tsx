import { describe, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '../src/components/Header/Header';
import '@testing-library/jest-dom/vitest';
import type { RenderResult } from '@testing-library/react';

describe('header component', () => {
  let headerElement: RenderResult;
  beforeEach(() => {
    headerElement = render(
      <Header
        onSearch={(query: string) => {
          localStorage.setItem('query', query);
          return query;
        }}
      />
    );
  });
  test('should render header', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
  test('header has h1 components with text: Search anime character', () => {
    expect(headerElement.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Search anime character'
    );
  });
  test('header has input with placeholder: What you search?', () => {
    expect(headerElement.getByPlaceholderText('What you search?'));
  });
  test('header has button type: submit and text: Search', () => {
    const button = headerElement.getByRole('button', { name: /Search/i });
    expect(button).toHaveAttribute('type', 'submit');
  });
  test('input has changed and button is clicked', () => {
    const button = headerElement.getByRole('button', { name: /Search/i });
    const input = headerElement.getByPlaceholderText('What you search?');
    fireEvent.change(input, { target: { value: 'search' } });
    fireEvent.click(button);
    expect(localStorage.getItem('query')).toBe('search');
  });
});
