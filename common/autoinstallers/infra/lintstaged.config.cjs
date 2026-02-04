/** @type {import('lint-staged').Configuration} */
module.exports = {
  '**/*.{ts,tsx,js,jsx,mjs,cjs,mts,cts}': () => {
    const commands = [];
    commands.push('biome check --staged --write');
    return commands;
  },
};
