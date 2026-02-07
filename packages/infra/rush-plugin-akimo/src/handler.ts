import { initRepoHandler } from './actions/init-repo';
import { DRYRUN } from './common/env';
import { error, warn } from './common/logger';
import { AcceptCommands } from './types';

const handlersMap = {
  [AcceptCommands.Init]: initRepoHandler,
};

export async function commandHandler(command: AcceptCommands) {
  if (DRYRUN) {
    warn('Running in dry-run mode. No changes will be made.');
  }

  const handler = handlersMap[command];

  if (!handler) {
    error(`Invalid command: ${command}`);
    process.exit(1);
  }

  await handler();
}
