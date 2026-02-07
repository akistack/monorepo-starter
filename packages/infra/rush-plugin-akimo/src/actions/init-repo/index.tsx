import { spawn } from 'node:child_process';
import { rm } from 'node:fs/promises';
import path from 'node:path/posix';
import { confirm, input } from '@inquirer/prompts';
import chalk from 'chalk';
import { render } from 'ink';
import { DEV, withDryrun } from '../../common/env';
import { getCurrentGitUserInfo, resetGitRepositoryHistory } from '../../common/git';
import { getIacConfig, removeIacConfig, updateIacConfig } from '../../common/iac';
import { debug, echo, info, success } from '../../common/logger';
import {
  getRawRushWorkspaceConfiguration,
  getRushWorkspaceConfiguration,
  getWorkspaceProjects,
  updateRushConfiguration,
} from '../../common/rush';
import { allowedCharacters, notEmpty, startsWith, validate } from '../../common/validate';
import { Progress } from './progress';

// #region form
async function inquery() {
  const repoName = await input({
    message: 'Enter the name of the monorepo (e.g. project-monorepo):',
    default: 'project-monorepo',
    validate: (value) => notEmpty(value, 'Repository name') || allowedCharacters(value, 'Repository name'),
  });

  const repoScope = await input({
    message: 'Enter the scope of the your organization (e.g. @akistack):',
    default: '@akistack',
    validate: (value) =>
      notEmpty(value, 'Scope') || startsWith(value, '@', 'Scope') || allowedCharacters(value.slice(1), 'Scope'),
  });

  const preserveExampleProjects = await confirm({
    message: 'Do you want to preserve the example projects?',
    default: false,
  });

  const reInitializeGit = await confirm({
    message: 'Do you want to re-initialize the Git repository?',
    default: !DEV,
  });

  return { repoName, repoScope, preserveExampleProjects, reInitializeGit };
}

// #region actions
async function createIacConfig(
  form: Awaited<ReturnType<typeof inquery>>,
  currentGitUserInfo: ReturnType<typeof getCurrentGitUserInfo>,
) {
  const instance = render(<Progress action="Creating IaC configuration..." loading={true} />);

  await updateIacConfig({
    repoName: form.repoName,
    scope: form.repoScope,
    maintainers: [`${currentGitUserInfo.name} <${currentGitUserInfo.email}>`],
    createdAt: new Date(),
  });

  instance.rerender(<Progress action="IaC configuration created successfully" loading={false} />);
  instance.unmount();
}

async function resetGitRepositoryHistoryIfNeeded(form: Awaited<ReturnType<typeof inquery>>) {
  if (!form.reInitializeGit) {
    return;
  }

  const instance = render(<Progress action="Re-initializing Git repository..." loading={true} />);

  await withDryrun(() => resetGitRepositoryHistory());

  instance.rerender(<Progress action="Git repository re-initialized" loading={false} />);
  instance.unmount();
}

async function removeExampleProjectsIfNeeded(form: Awaited<ReturnType<typeof inquery>>) {
  if (form.preserveExampleProjects) {
    return;
  }

  const instance = render(<Progress action="Removing example projects..." loading={true} />);

  await withDryrun(async () => {
    const rushRoot = getRushWorkspaceConfiguration().rushJsonFolder;
    const projects = getWorkspaceProjects();

    const exampleProjects = projects.filter((project) => project.packageName.includes('@your-scope'));

    // update rush configuration
    const rawConfiguration = getRawRushWorkspaceConfiguration();

    updateRushConfiguration({
      projects: rawConfiguration.projects.filter(
        (project) => !exampleProjects.some((p) => p.packageName === project.packageName),
      ),
    });

    // remove projects directory
    for (const project of exampleProjects) {
      debug(`Removing project: ${project.packageName} at ${path.join(rushRoot, project.projectFolder)}`);
      await rm(project.projectFolder, { recursive: true });
    }
  });

  instance.rerender(<Progress action="Example projects removed" loading={false} />);
  instance.unmount();
}

async function runRushUpdate() {
  let instance = render(<Progress action="Running `rush update` to update shrinkwrap file..." loading={true} />);
  instance.unmount();

  await withDryrun(
    () =>
      new Promise((resolve, reject) => {
        const handler = spawn('rush', ['update'], {
          stdio: 'inherit',
        });

        handler.on('close', (code) => {
          if (code === 0) {
            resolve(null);
          } else {
            reject(new Error(`rush update failed with code ${code}`));
          }
        });
      }),
  );

  instance = render(<Progress action="Rush shrinkwrap file updated" loading={false} />);
  instance.unmount();
}

// #region handler

/** Initialize akistack monorepo when first created */
export async function initRepoHandler() {
  // prepare
  if (DEV) {
    await removeIacConfig();
  }
  const iacConfig = await getIacConfig();
  validate(!iacConfig, 'Seems like this repository is already initialized. No need to run `init` command again.');

  const rushRoot = getRushWorkspaceConfiguration().rushJsonFolder;
  validate(rushRoot, 'You must run this command inside a valid Rush workspace.');

  const currentGitUserInfo = getCurrentGitUserInfo();
  validate(
    currentGitUserInfo.name && currentGitUserInfo.email,
    'You must set your Git user information before running init command. Please run `git config user.name <your-name>` and `git config user.email <your-email>` to set your Git user information.',
  );

  info(`🪄 Initializing new monorepo at: ${chalk.cyan(rushRoot)}\n`);

  // inquery
  const form = await inquery();
  const { repoName, repoScope } = form;

  echo('');

  // actions
  await createIacConfig(form, currentGitUserInfo);
  await resetGitRepositoryHistoryIfNeeded(form);
  await removeExampleProjectsIfNeeded(form);
  await runRushUpdate();

  // success
  echo('');
  success(chalk.green(`🎉 Congratulations! ${repoScope}/${repoName} monorepo has been initialized successfully!\n`));

  echo('You can commit the changes and push to the repository by running the following commands:\n');
  echo(chalk.blue('   git add .'));
  echo(chalk.blue(`   git commit -m "feat(all): initialize ${repoScope}/${repoName}" monorepo`));
  echo(chalk.blue('   git push origin main'));
  echo('\n');

  echo(chalk.green('🚀 Have fun coding!\n'));
}
