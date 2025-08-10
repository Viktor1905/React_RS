import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  animeCharacterResponseSchema,
  animeCharacterArraySchema,
} from './schemas';
import { z } from 'zod';
const baseUrl = import.meta.env.VITE_API_URL;

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['List', 'Character'],
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getCharacters: builder.query<
      z.infer<typeof animeCharacterArraySchema>,
      string
    >({
      query: (search) => `?q=${search}`,
      transformResponse: (response: unknown) => {
        const result = animeCharacterArraySchema.safeParse(response);
        if (!result.success) {
          throw new Error(`Invalid response format: ${result.error}`);
        }
        return result.data;
      },
    }),
    getCharacterById: builder.query<
      z.infer<typeof animeCharacterResponseSchema>,
      string
    >({
      query: (id) => `/${id}/full`,
      providesTags: (result, error, id) => [{ type: 'Character', id }],
      transformResponse: (response: unknown) => {
        const result = animeCharacterResponseSchema.safeParse(response);
        if (!result.success) {
          throw new Error(`Invalid response format: ${result.error}`);
        }
        return result.data;
      },
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } =
  charactersApi;
