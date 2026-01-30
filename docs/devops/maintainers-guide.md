# 👨‍💻 Maintainer's Guide

Welcome to the Rush monorepo template provided by `@akistack`. This template helps you create a new monorepo that integrates our recommended standards and solutions with less effort.

> This document is for the repo maintainers.

## Creating a New Monorepo from Template

1. Create a new repository in GitHub (or other codebase services): https://github.com/new

2. Clone this repo:

```shell
git clone git@github.com:akistack/monorepo-starter.git
cd monorepo-starter
```

3. Re-initialize Git and set origin to track your newly created repository (replace with your scope / repo):

```shell
rm -r .git
git init
git branch -M main
git remote add origin git@github.com:<someone>/<reponame>.git
```

4. Commit and push:

```shell
git add -A
git commit -m "feat(all): initialize monorepo from template"
git push -u origin main
```

## Getting Started

This monorepo template is managed by [Rush](https://rushjs.io). Rush is powerful but also strict, with many features, configurable options, and governance capabilities.

Rush includes a large set of configuration files, which can be overwhelming at first. If you are new to Rush, read the [Developer Tutorials](https://rushjs.io/pages/developer/new_developer/) and [Maintainer Tutorials](https://rushjs.io/pages/intro/welcome/) for a quick overview.

## Maintainer Notes

Below are practical guidelines for maintainers and architects to keep the repo healthy and scalable.

### Project Structure and Registration

- Keep projects organized under `apps/*` and `packages/<category>/*` to align with Rush's `projectFolderMinDepth` and `projectFolderMaxDepth` constraints.
- When adding a new package, register it in `rush.json` and assign meaningful `tags` (platform, role, and level) for governance and targeting.
- Prefer `rush init-project` to scaffold new projects from `common/_templates` to keep conventions aligned.

### Dependency Governance

- Use `workspace:` for internal dependencies to enforce local linking and catch regressions early.
- Align shared dependency versions via `globalCatalogs` in `common/config/rush/pnpm-config.json` to reduce version drift across projects.
- Keep dependency layers clear by following the `level-*` tag conventions (e.g., level-0 infra → level-4 apps) and avoid upwards dependencies.

### Installation and Consistency

- Run `rush update` after any `package.json` changes to refresh the lockfile; use `rush install` for day-to-day installs.
- By default, lockfile will not be merged by "their" when rebasing or merging branches. You will need to run `rush update` after rebase or merge.
- Avoid manual edits to `pnpm-lock.yaml` (Rush enforces this by default).

### Commands and CI

- Standardize project scripts to match Rush bulk commands (`build`, `typecheck`, `lint`, `test`, `e2e`) so CI can be configured uniformly.
