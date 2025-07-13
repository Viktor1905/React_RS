import type { AnimeCharacter, AnimeCharacterResponse } from './api.ts';

export function isAnimeCharacterResponse(
  value: unknown
): value is AnimeCharacterResponse {
  if (typeof value !== 'object' || value === null) return false;

  const obj = value as Record<string, unknown>;

  if (!Array.isArray(obj.data)) return false;

  return obj.data.every((item: unknown): item is AnimeCharacter => {
    if (typeof item !== 'object' || item === any) return false;

    const char = item as Record<string, unknown>;

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
  });
}
