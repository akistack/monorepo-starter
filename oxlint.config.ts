import baseConfig from './common/autoinstallers/infra/node_modules/@akistack/oxlint-config/dist/oxlint.config.js';
import { defineConfig } from './common/autoinstallers/infra/node_modules/oxlint/dist/index.js';

export default defineConfig({
  ...baseConfig,
});
