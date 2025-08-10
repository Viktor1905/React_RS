import { z } from 'zod';

export const animeCharacterSchema = z.object({
  mal_id: z.number(),
  url: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  images: z.object({
    jpg: z.object({
      image_url: z.string(),
    }),
  }),
});

export const animeFullCharacterSchema = animeCharacterSchema.extend({
  name_kanji: z.string().nullable().optional(),
  about: z.string().nullable().optional(),
  description: z.string().optional(),
  anime: z.array(
    z
      .object({
        role: z.string().optional(),
        anime: z.object({
          title: z.string().optional(),
        }),
      })
      .nullable()
      .optional()
  ),
});

export const animeCharacterArraySchema = z.object({
  data: z.array(animeCharacterSchema),
});

export const animeCharacterResponseSchema = z.object({
  data: animeFullCharacterSchema,
});

export type FullCharacterResponse = z.infer<
  typeof animeCharacterResponseSchema
>;
export type ArrayCharacterResponse = z.infer<typeof animeCharacterArraySchema>;
export type CharacterSchema = z.infer<typeof animeCharacterSchema>;
