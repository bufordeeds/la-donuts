import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: [
      // Integration tests — may boot Payload / talk to the DB. Run locally
      // via `pnpm test:int`; not wired into CI because they require infra.
      'tests/int/**/*.int.spec.ts',
      // Pure-logic unit tests — safe to run anywhere. CI gate uses
      // `pnpm test:unit`, which targets this glob only.
      'tests/unit/**/*.unit.spec.ts',
    ],
  },
})
