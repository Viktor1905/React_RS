import { AnimeCharacterResponse } from '../../src/api/api';
import { vi } from 'vitest';
import * as api from '../../src/api/api';
import { arrLuffy, arrZoro } from './arrays-for-test';
const defaultError = new Error('Character not found');
export const mockApi = {
  success: (data: AnimeCharacterResponse): void => {
    vi.spyOn(api, 'requestApi').mockResolvedValue(data);
  },
  error: (error: Error): void => {
    vi.spyOn(api, 'requestApi').mockRejectedValue(error);
  },
  reset: (): void => {
    vi.restoreAllMocks();
  },
  mockConditional: () => {
    vi.spyOn(api, 'requestApi').mockImplementation(
      (query: string): Promise<AnimeCharacterResponse> => {
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
