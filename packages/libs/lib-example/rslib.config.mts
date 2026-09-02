import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    // ESM bundled
    {
      format: 'esm',
      syntax: ['node 22'],
      dts: true,
    },

    // CommonJS bundled
    {
      format: 'cjs',
      syntax: ['node 22'],
    },

    // ESM bundleless
    {
      format: 'esm',
      syntax: ['node 22'],
      dts: true,
      bundle: false,
      output: {
        distPath: './dist/es',
      },
      outBase: './src',
    },
  ],
});
