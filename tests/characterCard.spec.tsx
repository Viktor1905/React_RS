import '@testing-library/jest-dom/vitest';
import { beforeEach, describe } from 'vitest';
import { arrLuffy } from './test-utils/arrays-for-test';
import { render, RenderResult } from '@testing-library/react';
import { CharacterCard } from '../src/components/Main/CharacterCard';
import { MemoryRouter } from 'react-router';
import store from '../src/app/store';
import { Provider } from 'react-redux';
import { CharacterSchema } from '../src/api/schemas';

describe('character card component', (): void => {
  let card: RenderResult;
  const character: CharacterSchema = arrLuffy.data[0];
  beforeEach((): void => {
    card = render(
      <MemoryRouter>
        <Provider store={store}>
          <CharacterCard character={character} />
        </Provider>
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
  test('card must have a popUp', (): void => {
    const checkbox: HTMLElement = card.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });
  test('checkbox manage store', (): void => {
    const allSelectedCharacter = store.getState().selectedCharacter;
    const link: HTMLElement = card.getByRole('checkbox');
    link.click();
    expect(!!allSelectedCharacter.selected[String(character.mal_id)]);
    link.click();
    expect(!allSelectedCharacter.selected[String(character.mal_id)]);
  });
});
