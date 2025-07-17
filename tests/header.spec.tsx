import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../src/components/Header/Header';
import '@testing-library/jest-dom/vitest';

describe('header', () => {
  test('should render header', () => {
    render(<Header onSearch={() => 1} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
