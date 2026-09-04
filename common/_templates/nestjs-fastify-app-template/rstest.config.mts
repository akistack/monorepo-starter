import { defineConfig } from '@rstest/core';

export default defineConfig({
  coverage: {
    provider: 'v8',
  },
  source: {
    decorators: {
      version: 'legacy',
    },
  },
});
