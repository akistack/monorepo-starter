import { withRsbuildConfig } from '@rstest/adapter-rsbuild';
import { defineConfig } from '@rstest/core';

export default defineConfig({
  coverage: {
    provider: 'v8',
  },
  extends: withRsbuildConfig({
    configPath: './rsbuild.config.mts',
  }),
  exclude: ['e2e/**'],
  passWithNoTests: true,
});
