// This is a monorepo-wide fallback configuration for Oxfmt.

import baseConfig from './common/autoinstallers/infra/node_modules/@akistack/oxlint-config/dist/oxfmt.config.js';

export default {
  ...baseConfig,
  ignorePatterns: ['**/common/temps/**', '**/common/_templates/**', '**/node_modules/**'],
};
