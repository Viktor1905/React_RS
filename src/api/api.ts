import { isAnimeCharacterArray } from './isAnimeCharacterArray.ts';
import { isAnimeCharacterResponse } from './isAnimeCharacter';
const baseUrl = import.meta.env.VITE_API_URL;

export async function getCharacters(
  search: string
): Promise<AnimeCharacterArrayResponse> {
  const url: string = baseUrl + '?q=' + search;
  try {
    const response = await fetch(url);
    const characterResponse: unknown = await response.json();
    if (!isAnimeCharacterArray(characterResponse)) {
      throw new Error('Invalid products response format');
    }
    return characterResponse;
  } catch (error) {
    throw new Error(
      `Product request failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
export async function getOneCharacter(
  id: string
): Promise<AnimeCharacterResponse> {
  const url: string = baseUrl + '/' + id + '/full';
  try {
    const response = await fetch(url);
    const characterResponse: unknown = await response.json();
    if (!isAnimeCharacterResponse(characterResponse)) {
      throw new Error('Invalid products response format');
    }
    return characterResponse;
  } catch (error) {
    throw new Error(
      `Product request failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
export interface AnimeCharacter {
  mal_id: string;
  url: string;
  name: string;
  description?: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}
export interface AnimeFullCharacter {
  mal_id: string;
  url: string;
  name: string;
  name_kanji: string;
  anime: { role: string; anime: { title: string } }[];
  about?: string;
  description?: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}
export interface AnimeCharacterArrayResponse {
  data: AnimeCharacter[];
}
export interface AnimeCharacterResponse {
  data: AnimeFullCharacter;
}
