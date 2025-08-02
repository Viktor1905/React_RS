import type { AnimeCharacter, AnimeCharacterResponse } from './api';

export function isAnimeCharacter(value: unknown): value is AnimeCharacter {
  if (typeof value !== 'object' || value === null) return false;
  const char = value as Record<string, unknown>;

  return (
    typeof char.url === 'string' &&
    typeof char.name === 'string' &&
    typeof char.images === 'object' &&
    char.images !== null &&
    typeof (char.images as Record<string, unknown>).jpg === 'object' &&
    (char.images as Record<string, unknown>).jpg !== null &&
    typeof (
      (char.images as Record<string, unknown>).jpg as Record<string, unknown>
    ).image_url === 'string'
  );
}

export function isAnimeCharacterResponse(
  value: unknown
): value is AnimeCharacterResponse {
  if (value && typeof value === 'object' && 'data' in value)
    return isAnimeCharacter(value.data);
  return false;
}
