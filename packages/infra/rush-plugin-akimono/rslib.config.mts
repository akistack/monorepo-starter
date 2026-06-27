import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'cjs',
      dts: false,
    },
  ],
  output: {
    externals: [
      // ink dependencies
      'react-devtools-core',
      'bufferutil',
      'utf-8-validate',
    ],
  },
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: 'automatic',
      },
    }),
  ],
});
