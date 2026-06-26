/** @type {import('lint-staged').Configuration} */
module.exports = {
  '**/*.{ts,tsx,js,jsx,mjs,cjs,mts,cts}': (stagedFiles) => {
    const commands = [];
    commands.push(`oxlint --fix ${stagedFiles.join(' ')}`);
    commands.push(`oxfmt --write ${stagedFiles.join(' ')}`);
    commands.push(`git add ${stagedFiles.join(' ')}`);
    return commands;
  },
};
