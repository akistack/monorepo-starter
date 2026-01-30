<!-- Replace the title of README with your repository name. -->

# `@akistack` Monorepo Starter

<!-- Replace the description below with your own description of this monorepo.  -->

Welcome to the Rush monorepo template provided by `@akistack`. This template helps you create a new monorepo that integrates our recommended standards and solutions with less effort.

> Note: This README is for developers. If you want to know how to create monorepo from this template, please refer to [Maintainer's Guide](docs/maintainer-guide.md).

## Prerequisites

Before you start, ensure you have the following tools installed and configured:

* [Git](https://git-scm.com/install/)
* [Node.js](https://nodejs.org/) (>= 22 LTS)
  * We recommend using [fnm](https://fnm.vercel.app) to manage Node.js versions
  * This repo includes a `.nvmrc` for quick switching
* [Rush.js](https://www.npmjs.com/package/@microsoft/rush) (@microsoft/rush)
  * `npm i -g @microsoft/rush`

## Getting Started

> If you are not familiar with Rush.js, refer to the [Rush.js docs](https://rushjs.io/pages/developer/new_developer/) for more details.

### Clone Repository

<!-- Replace the following Git address with your own repo. -->

```shell
git clone git@github.com:akistack/monorepo-starter.git
cd monorepo-starter
```

### Install or Update Dependencies

```shell
## Installing dependencies
rush install

## Updating dependencies and shrinkwrap file
rush update
```

> * Use `rush install` for installing from the existing lockfile.
> * Use `rush update` when you change any `package.json` to refresh the lockfile.

### Build a Project and/or Its Dependencies

```shell
## Building a project `foo` and its dependencies
rush build -t foo   # equivalent to `rush build --to foo`

## Building all dependencies of project `foo` except itself
rush build -T foo   # equivalent to `rush build --to-except foo`

## Building all projects
rush build
```

### Daily Commands

```shell
## Run unit tests for projects
rush test
rush test:coverage    # with coverage

## Run type checking and linting
rush typecheck
rush lint

## Run E2E testing
rush e2e
```

### Initializing a New Project

Run `rush init-project` and select a template. Then fill the form with package name, author, project path, etc.

After completion, run `rush update` to install dependencies and update the shrinkwrap file.

### Project Scripts (rushx)

When you need to run scripts for a specific project, use `rushx` from that project's folder:

```shell
cd apps/web/app-web-example
rushx dev
```

## Structure

```
├── apps                # Applications (L4)
│   ├── server
│   └── web
├── common              # Rush infra directory
│   ├── _templates      # Template for init-project
│   ├── autoinstallers  # CLI & Rush plugins
│   ├── config          # Detailed configurations for Rush / PNPM
│   ├── git-hooks
│   ├── scripts
├── docs                # Documents
├── packages            # Shared packages
│   ├── business        # Business modules / features (L3)
│   ├── domain          # Domain packages (L2)
│   ├── infra           # Infra packages (L0 / L1)
│   └── libs            # Components / libs (L1)
└── rush.json           # Global Rush configuration
```

## Recommended Stack

This monorepo comes with our recommended stack. We aim to keep the technical stack consistent across the repo. See the table below:

| Area | Recommended Framework / Library |
|-------|---------------------------------|
| Language | TypeScript-first |
| UI Framework | React |
| Styling | CSS Modules and Tailwind CSS |
| Routing | Tanstack Router |
| Monorepo | Rush.js |
| Bundler | Rstack (Rsbuild / Rspack) |
| Library Build | Rslib |
| Lint | Biome |
| Unit Testing | Vitest |
| Component Testing | Testing Library |
| E2E Testing | Playwright |

## Conventions

| Target | Specification |
|---------|---------------|
| Source-Control Branching Model | Follow [Trunk Based Development](https://trunkbaseddevelopment.com/) |
| Branch | Follow [Conventional Branch Specification](https://conventional-branch.github.io/) |
| Commit | Follows [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/) |

## Support

<!-- Replace the below text with your own support channel. -->

Feel free to open an issue in [akistack/monorepo-starter](https://github.com/akistack/monorepo-starter) for help and feedback.
