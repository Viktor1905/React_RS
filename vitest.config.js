import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['tests/**/*.spec.ts', 'tests/**/*.spec.tsx', 'tests/**/*.test.ts', 'tests/**/*.test.tsx',],
      exclude: ['**/node_modules/**', '**/.husky/**', '**/.idea/**'],
      environment: 'jsdom',
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
})