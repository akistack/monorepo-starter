import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path/posix';
import ejs from 'ejs';
import { getRushWorkspaceConfiguration } from '../../common/rush';
import type { IacConfig } from '../../types';

export async function renderReadme(params: IacConfig) {
  const workspaceRoot = getRushWorkspaceConfiguration().rushJsonFolder;
  const documentTemplatePath = path.join(workspaceRoot, 'docs', '_templates');
  const readmeTemplatePath = path.join(documentTemplatePath, 'README.md');
  const readmePath = path.join(workspaceRoot, 'README.md');

  const template = await readFile(readmeTemplatePath, 'utf-8');
  const rendered = ejs.render(template, { params });
  await writeFile(readmePath, rendered);
  return readmePath;
}

export async function removeDocTemplatesFolder() {
  const workspaceRoot = getRushWorkspaceConfiguration().rushJsonFolder;
  const documentTemplatePath = path.join(workspaceRoot, 'docs', '_templates');
  await rm(documentTemplatePath, { recursive: true, force: true });
}
