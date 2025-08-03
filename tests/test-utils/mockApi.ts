import { AnimeCharacterArrayResponse } from '../../src/api/api';
import { vi } from 'vitest';
import * as api from '../../src/api/api';
import { arrLuffy, arrZoro } from './arrays-for-test';
const defaultError = new Error('Character not found');
export const mockApi = {
  success: (data: AnimeCharacterArrayResponse): void => {
    vi.spyOn(api, 'getCharacters').mockResolvedValue(data);
  },
  error: (error: Error): void => {
    vi.spyOn(api, 'getCharacters').mockRejectedValue(error);
  },
  reset: (): void => {
    vi.restoreAllMocks();
  },
  mockConditional: () => {
    vi.spyOn(api, 'getCharacters').mockImplementation(
      (query: string): Promise<AnimeCharacterArrayResponse> => {
        if (query.toLowerCase() === 'luffy') {
          return Promise.resolve(arrLuffy);
        }
        if (query.toLowerCase() === 'zoro') {
          return Promise.resolve(arrZoro);
        }
        return Promise.reject(defaultError);
      }
    );
  },
};
