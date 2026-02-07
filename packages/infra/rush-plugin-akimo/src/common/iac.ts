import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { merge } from '@rushstack/rush-sdk/lib/utilities/objectUtilities';
import type { IacConfig } from '../types';
import { debug, error } from './logger';
import { getRushWorkspaceConfiguration } from './rush';

export function getIacConfigFolder() {
  const rushConfiguration = getRushWorkspaceConfiguration();
  const rushRoot = rushConfiguration.rushJsonFolder;

  return path.join(rushRoot, 'common/config/.iac');
}

export function getIacConfigPath() {
  return path.join(getIacConfigFolder(), 'iac.config.json');
}

export async function getIacConfig() {
  const iacConfig = getIacConfigPath();

  try {
    if (!existsSync(iacConfig)) {
      debug(`IaC configuration file not found: ${iacConfig}`);
      return null;
    }

    const file = await readFile(iacConfig, 'utf-8');
    return JSON.parse(file) as IacConfig;
  } catch (err) {
    error(`Failed to load IaC configuration: ${err}`);
    process.exit(1);
  }
}

export async function updateIacConfig(update: Partial<IacConfig>) {
  const iacConfigFolder = getIacConfigFolder();

  if (!existsSync(iacConfigFolder)) {
    await mkdir(iacConfigFolder, { recursive: true });
  }

  const iacConfigPath = getIacConfigPath();

  try {
    const previousConfig = await getIacConfig();
    const nextConfig = merge(previousConfig ?? {}, {
      updatedAt: new Date(),
      ...update,
    });

    await writeFile(iacConfigPath, JSON.stringify(nextConfig, null, 2));
  } catch (err) {
    error(`Failed to update IaC configuration: ${err}`);
    process.exit(1);
  }
}

export async function removeIacConfig() {
  const iacConfigFolder = getIacConfigFolder();
  await rm(iacConfigFolder, { recursive: true, force: true });
}
