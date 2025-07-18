import { AnimeCharacterResponse } from '../../src/api/api';
import { vi } from 'vitest';
import * as api from '../../src/api/api';
export const mockApi = {
  success: (data: AnimeCharacterResponse) => {
    vi.spyOn(api, 'requestApi').mockResolvedValue(data);
  },
  error: (error: Error) => {
    vi.spyOn(api, 'requestApi').mockRejectedValue(error);
  },
  reset: () => {
    vi.restoreAllMocks();
  },
};
