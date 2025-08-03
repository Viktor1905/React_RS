import '@testing-library/jest-dom/vitest';
import { beforeEach, describe } from 'vitest';
import { arrLuffy } from './test-utils/arrays-for-test';
import { render, RenderResult } from '@testing-library/react';
import { CharacterCard } from '../src/components/Main/CharacterCard';
import { AnimeCharacter } from '../src/api/api';
import { MemoryRouter } from 'react-router';

describe('character card component', (): void => {
  let card: RenderResult;
  const character: AnimeCharacter = arrLuffy.data[0];
  beforeEach((): void => {
    card = render(
      <MemoryRouter>
        <CharacterCard character={character} />
      </MemoryRouter>
    );
  });
  test('should render a card', (): void => {
    expect(card.getByRole('listitem')).toBeInTheDocument();
  });
  test('card must have a correct img', (): void => {
    const img: HTMLElement = card.getByRole('img');
    expect(img).toHaveAttribute('src', `${character.images.jpg.image_url}`);
  });
  test('card must have a name', (): void => {
    expect(card.getByText(`${character.name}`)).toBeInTheDocument();
  });
  test('card must have a correct link', (): void => {
    const link: HTMLElement = card.getByRole('link');
    expect(link).toHaveAttribute('href', `${character.url}`);
  });
});
