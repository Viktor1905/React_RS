import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // путь до src
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
        provider: 'v8',
      include: [
        'tests/**/*.spec.ts',
        'tests/**/*.spec.tsx',
        'tests/**/*.test.ts',
        'tests/**/*.test.tsx',
      ],
      exclude: ['**/node_modules/**', '**/.husky/**', '**/.idea/**'],
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
});
