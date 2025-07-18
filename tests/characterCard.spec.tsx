import '@testing-library/jest-dom/vitest';
import { beforeEach, describe } from 'vitest';
import { arrLuffy } from './test-utils/arrays-for-test';
import { render, RenderResult } from '@testing-library/react';
import { CharacterCard } from '../src/components/Main/CharacterCard';

describe('character card component', () => {
  let card: RenderResult;
  const character = arrLuffy.data[0];
  beforeEach(() => {
    card = render(<CharacterCard character={character} />);
  });
  test('should render a card', () => {
    expect(card.getByRole('listitem')).toBeInTheDocument();
  });
  test('card must have a correct img', () => {
    const img = card.getByRole('img');
    expect(img).toHaveAttribute('src', `${character.images.jpg.image_url}`);
  });
  test('card must have a name', () => {
    expect(card.getByText(`${character.name}`)).toBeInTheDocument();
  });
  test('card must have a correct link', () => {
    const link = card.getByRole('link');
    expect(link).toHaveAttribute('href', `${character.url}`);
  });
});
