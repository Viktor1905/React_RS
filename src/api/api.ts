import { isAnimeCharacterResponse } from './isAnimeCharacterArray.ts';
const baseUrl = 'https://api.jikan.moe/v4/characters?';

export async function requestApi(
  search: string
): Promise<AnimeCharacterResponse> {
  const url: string = baseUrl + 'q=' + search + '&limit=20';
  try {
    const response = await fetch(url);
    const characterResponse: unknown = await response.json();
    if (!isAnimeCharacterResponse(characterResponse)) {
      throw new Error('Invalid products response format');
    }
    console.log(characterResponse);
    return characterResponse;
  } catch (error) {
    throw new Error(
      `Product request failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export interface AnimeCharacter {
  url: string;
  name: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}
export interface AnimeCharacterResponse {
  data: AnimeCharacter[];
}
