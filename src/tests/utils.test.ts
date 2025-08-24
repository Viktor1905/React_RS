import { expect, test } from 'vitest';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter.ts';

test('capitalizeFirstLetter', async (): Promise<void> => {
  const result = capitalizeFirstLetter('string');
  expect(result).toBe('String');
});
test('capitalizeFirstLetter without string', async (): Promise<void> => {
  const result = capitalizeFirstLetter(null);
  expect(result).toBe('');
});
