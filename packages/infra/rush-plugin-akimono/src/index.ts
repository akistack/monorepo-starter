#!/usr/bin/env node

import { ExitPromptError } from '@inquirer/core';
import { select } from '@inquirer/prompts';
import chalk from 'chalk';

import { DRYRUN } from './common/env';
import { getIacConfig } from './common/iac';
import { debug, echo } from './common/logger';
import { commandHandler } from './handler';
import { type AcceptCommands, AcceptCommandsConfig } from './types';

async function main() {
  try {
    const iacConfig = await getIacConfig();
    const repoName = `${iacConfig?.scope ?? '@akistack'}/${iacConfig?.repoName ?? 'monorepo'}`;

    echo(chalk.green(`\n🍁 Welcome to ${repoName}!\n`));

    if (DRYRUN) {
      echo(chalk.yellow('🚧 Dry run mode is enabled. Some operations will be skipped.\n'));
    }

    const operation = await select({
      message: 'Select the operation to run:',
      choices: AcceptCommandsConfig,
    });

    await commandHandler(operation as AcceptCommands);
  } catch (error) {
    if (error instanceof ExitPromptError) {
      debug('Prompt cancelled:', error);
      process.exit(0);
    }

    throw error;
  }
}

void main();
