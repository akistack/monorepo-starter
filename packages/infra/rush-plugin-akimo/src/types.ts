export enum AcceptCommands {
  Init = 'init',
}

export const AcceptCommandsList = [AcceptCommands.Init] as const;

export const AcceptCommandsConfig = [
  {
    name: '(init) initialize a new monorepo from template',
    value: AcceptCommands.Init,
  },
];

export interface IacConfig {
  repoName: string;
  scope: string;
  maintainers: string[];
  createdAt: Date;
  updatedAt: Date;
}
