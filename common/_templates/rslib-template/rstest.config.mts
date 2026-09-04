import { withRslibConfig } from '@rstest/adapter-rslib';
import { defineConfig } from '@rstest/core';

export default defineConfig({
  coverage: {
    provider: 'v8',
  },
  extends: withRslibConfig({
    configPath: './rslib.config.mts',
  }),
  passWithNoTests: true,
});
