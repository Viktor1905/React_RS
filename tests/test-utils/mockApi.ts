import { createApi } from '@reduxjs/toolkit/query/react';
import { arrLuffy } from './arrays-for-test';
import {
  ArrayCharacterResponse,
  FullCharacterResponse,
} from '../../src/api/schemas';
import { createTestStore } from './test-store';

let mockData: ArrayCharacterResponse | null = arrLuffy;
let mockDetails: FullCharacterResponse | null = { data: arrLuffy.data[0] };
let delayDuration = 0;
let shouldFail: boolean = false;

export const mockApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: async () => {
    await new Promise((resolve) => setTimeout(resolve, delayDuration));
    if (shouldFail) {
      return {
        error: {
          status: 'CUSTOM_ERROR',
          data: 'Internal Server Error',
        },
      };
    }
    return { data: mockData ?? null };
  },
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: () => {
        '';
      },
      transformResponse: (response) => response,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Error in mock query:', error);
        }
      },
    }),
    getCharacterById: builder.query({
      query: () => ``,
      transformResponse: () => mockDetails,
    }),
  }),
});

export const setError = (error: boolean) => {
  shouldFail = error;
};
export const setDelay = (delay: number) => {
  delayDuration = delay;
};
export const setMockData = (data: ArrayCharacterResponse) => {
  mockData = data;
};

export const setMockDetails = (data: FullCharacterResponse | null) => {
  mockDetails = data;
};

export const resetMockData = () => {
  mockData = null;
  shouldFail = false;
  delayDuration = 0;
};
export const { useGetCharactersQuery, useGetCharacterByIdQuery } = mockApi;
export type TestStore = ReturnType<typeof createTestStore>;
