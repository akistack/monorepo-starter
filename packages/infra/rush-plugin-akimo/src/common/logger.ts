/** biome-ignore-all lint/suspicious/noConsole: console application */

import chalk from 'chalk';

function mapLogLevelStringToInteger(logLevel: string) {
  switch (logLevel) {
    case 'debug':
      return 0;
    case 'info':
      return 1;
    case 'warn':
    case 'success':
      return 2;
    case 'error':
      return 3;
    case 'fatal':
      return 4;
    default:
      return 1;
  }
}

export function getLogLevel() {
  const logLevel = mapLogLevelStringToInteger(process.env.LOG_LEVEL ?? 'info');
  return logLevel;
}

export function echo(...args: Parameters<typeof console.log>) {
  console.log(chalk.white(...args));
}

export function info(...args: Parameters<typeof console.log>) {
  if (getLogLevel() > 1) {
    return;
  }
  console.info(chalk.blue('INFO  '), ...args);
}

export function error(...args: Parameters<typeof console.log>) {
  if (getLogLevel() > 3) {
    return;
  }
  console.error(chalk.red('ERROR '), ...args);
}

export function warn(...args: Parameters<typeof console.log>) {
  if (getLogLevel() > 2) {
    return;
  }
  console.warn(chalk.yellow('WARN  '), ...args);
}

export function success(...args: Parameters<typeof console.log>) {
  if (getLogLevel() > 2) {
    return;
  }
  console.log(chalk.green('SUCC '), ...args);
}

export function debug(...args: Parameters<typeof console.log>) {
  if (getLogLevel() > 0) {
    return;
  }
  console.log(chalk.gray('DEBUG '), ...args);
}

export function fatal(...args: Parameters<typeof console.log>) {
  if (getLogLevel() > 4) {
    return;
  }
  console.error(chalk.red('FATAL '), ...args);
}
