import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, rename } from 'node:fs/promises';
import path from 'node:path/posix';
import { getIacConfigFolder } from './iac';
import { debug, warn } from './logger';
import { getRushWorkspaceConfiguration } from './rush';

export function getCurrentGitUserInfo() {
  const userInfo = execSync('git config user.name');
  const email = execSync('git config user.email');

  return {
    name: userInfo.toString().trim(),
    email: email.toString().trim(),
  };
}

export function getCurrentOriginUrl() {
  try {
    const originUrl = execSync('git config remote.origin.url');
    return originUrl.toString().trim();
  } catch (error) {
    debug('Failed to get current origin URL: ', error);
    return null;
  }
}

/** Warning: dangerous operation, only use when initialize repo first time */
export async function resetGitRepositoryHistory() {
  // check if .git directory exists
  const workspaceRoot = getRushWorkspaceConfiguration().rushJsonFolder;

  if (!existsSync(path.join(workspaceRoot, '.git'))) {
    warn('No .git directory found. Nothing to do.');
  }

  // use soft delete to prevent data loss
  // just move `.git` to a temporary directory `common/config/.iac/temp/git-backup`
  const iacFolder = getIacConfigFolder();
  const tempGitBackupFolder = path.join(iacFolder, 'temp', 'git-backup', `${Date.now()}`);

  debug('.git will be moved to a temporary directory: ', tempGitBackupFolder);

  if (!existsSync(tempGitBackupFolder)) {
    await mkdir(tempGitBackupFolder, { recursive: true });
  }

  await rename(path.join(workspaceRoot, '.git'), tempGitBackupFolder);

  // re-initialize git repository
  execSync('git init', {
    cwd: workspaceRoot,
  });
}
