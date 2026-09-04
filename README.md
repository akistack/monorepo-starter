# 🍁 @akistack Monorepo Starter

Welcome to the Rush monorepo template provided by `@akistack`. This template helps you create a new monorepo that integrates our recommended standards and solutions with less effort.

## Prerequisites

Before you start, ensure you have the following tools installed and configured:

* [Git](https://git-scm.com/install/)
* [Node.js](https://nodejs.org/) (>= 22 LTS, We recommend using [fnm](https://fnm.vercel.app) to manage Node.js versions)
* [Rush.js](https://www.npmjs.com/package/@microsoft/rush) (Install: `npm i -g @microsoft/rush`)

## Getting Started

### Creating a New Monorepo from Template

1. Create a new repository in GitHub (or other codebase services): https://github.com/new

2. Clone this repo:

```shell
git clone git@github.com:akistack/monorepo-starter.git my-project --depth 1
cd my-project
```

3. Install dependencies:

```shell
rush update
```

4. Run `akimono` monorepo initialization wizard:

```shell
rush akimono
```

Select `init`, then follow the prompt to initialize the repo.

5. Commit and push:

```shell
git add -A
git commit -m "feat(all): initialize monorepo from template"
git push -u origin main
```


### Initializing a New Project

Run `rush init-project` and select a template. Then fill the form with package name, author, project path, etc.

After completion, run `rush update` to install dependencies and update the shrinkwrap file.

## Project Structure

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
| UI Framework | React 19 |
| Styling | CSS Modules and Tailwind CSS 4 |
| Routing | Tanstack Router |
| Package Manager | PNPM |
| Monorepo Tool | Rush.js |
| Bundler | Rstack (Rsbuild 2 / Rspack 2) |
| Library Build | Rslib |
| Lint | Oxlint |
| Formatter | Oxfmt |
| Unit Testing | Rstest |
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
