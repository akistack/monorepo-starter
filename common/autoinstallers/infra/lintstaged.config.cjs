/** @type {import('lint-staged').Configuration} */
module.exports = {
  '**/*.{ts,tsx,js,jsx,mjs,cjs,mts,cts}': (stagedFiles) => {
    const commands = [];
    commands.push('biome check --staged --write');
    commands.push(`git add ${stagedFiles.join(' ')}`);
    return commands;
  },
};
