import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { isAnimeCharacterResponse } from '../api/isAnimeCharacterArray';
import type { AnimeCharacterResponse } from '../api/api';

export const useLocalStorage = (
  key: string,
  initialValue: AnimeCharacterResponse | null = null
): [
  AnimeCharacterResponse | null,
  Dispatch<SetStateAction<AnimeCharacterResponse | null>>,
] => {
  const [value, setValue] = useState<AnimeCharacterResponse | null>(
    (): AnimeCharacterResponse | null => {
      const stored: string | null = localStorage.getItem(key);
      if (!stored) return initialValue;
      try {
        const parsed = JSON.parse(stored);
        return isAnimeCharacterResponse(parsed) ? parsed : initialValue;
      } catch {
        return initialValue;
      }
    }
  );

  useEffect((): void => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
