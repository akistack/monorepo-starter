import { JsonFile } from '@rushstack/node-core-library';
import { RushConfiguration } from '@rushstack/rush-sdk';
import { merge } from '@rushstack/rush-sdk/lib/utilities/objectUtilities';

import { error } from './logger';
import { validate } from './validate';

export function getRushWorkspaceConfiguration(): RushConfiguration {
  const configuration = RushConfiguration.tryLoadFromDefaultLocation();

  if (!configuration) {
    error('Failed to load Rush workspace configuration. ');
    process.exit(1);
  }

  return configuration;
}

export function getWorkspaceProjects() {
  const configuration = getRushWorkspaceConfiguration();
  return configuration.projects;
}

export function getRawRushWorkspaceConfiguration() {
  const rushJsonPath = RushConfiguration.tryFindRushJsonLocation();
  validate(
    rushJsonPath,
    'Failed to detect `rush.json` file. Please ensure you are running this command inside a valid Rush workspace.',
  );

  const rawConfiguration = JsonFile.load(rushJsonPath) as unknown as RushConfiguration;
  return rawConfiguration;
}

export function updateRushConfiguration(update: Partial<RushConfiguration>) {
  const rushJsonPath = RushConfiguration.tryFindRushJsonLocation();
  validate(
    rushJsonPath,
    'Failed to detect `rush.json` file. Please ensure you are running this command inside a valid Rush workspace.',
  );

  const configuration = getRawRushWorkspaceConfiguration();
  const nextConfiguration = merge(configuration, update);
  JsonFile.save(nextConfiguration, rushJsonPath, {
    updateExistingFile: true,
  });
}
