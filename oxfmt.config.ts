import baseConfig from './common/autoinstallers/infra/node_modules/@akistack/oxlint-config/dist/oxfmt.config.js';
import { defineConfig } from './common/autoinstallers/infra/node_modules/oxfmt/dist/index.js';

export default defineConfig({
  ...baseConfig,
});
