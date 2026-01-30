# Maintainer's Guide

Welcome to the Rush monorepo template provided by `@akistack`. This template helps you create a new monorepo that integrates our recommended standards and solutions with less effort.

## Creating a New Monorepo from Template

1. Create a new repository in GitHub (or other codebase services): https://github.com/new

2. Clone this repo:

```shell
git clone git@github.com:akistack/monorepo-starter.git
cd monorepo-starter
```

3. Re-initialize Git and set origin to track your newly created repository:

```shell
rm -r .git
git init
git branch -M main
git remote add origin git@github.com:akistack/monorepo-starter.git
```

4. Commit and push:

```shell
git add -A
git commit -m "feat(all): create monorepo from template"
git push -u origin main
```

## Template Introduction

这个模板在 Rush 原始配置上做了针对团队规模化协作的增强，目标是「一致的工程体验 + 可治理的依赖关系 + 可演进的技术栈」。下面按配置、模板、选型与特色说明。

### Rush 配置变更与增强

- **PNPM Workspaces 默认开启**：`pnpm-config.json` 中启用 `useWorkspaces`，统一 workspace 依赖链接方式，降低装包复杂度与分叉行为。
- **锁文件更严格**：启用 `preventManualShrinkwrapChanges`，并在 `experiments.json` 中开启 `usePnpmFrozenLockfileForRushInstall`，确保 `rush install` 不改锁文件，保障可复现性。
- **项目目录层级约束**：`rush.json` 将 `projectFolderMinDepth=2`、`projectFolderMaxDepth=5`，鼓励按 `apps/*`、`packages/<category>/*` 的可维护结构组织工程。
- **包标签体系**：内置 `allowedProjectTags`（平台/角色/层级），用于治理依赖关系与仓库选包筛选。
- **统一命令入口**：`command-line.json` 预置 `build/typecheck/lint/test/e2e` 等 bulk 命令，统一脚本命名与CI调度策略。
- **插件与自动安装器**：`rush-plugins.json` 启用 `rush-init-project-plugin`（新工程模板化生成）与 `rush-sort-package-json`（包依赖排序一致性），并在 `common/autoinstallers/infra` 提供 commitlint/biome/ts 等基础工具，避免全局依赖漂移。
- **可扩展特性预留**：build cache、cobuild、subspaces 等配置已就位但默认关闭，方便后续规模化演进时启用。
- **依赖版本目录（Catalog）**：`pnpm-config.json` 中设定 `globalCatalogs`，将基础设施、React 与常用解决方案版本集中管理，降低跨项目版本漂移。

### 模板内容

当前内置一个 Web 端模板：`(Web) Rsbuild React App`，即 `common/_templates/rsbuild-react-app`。它提供：

- React + TypeScript 基础工程
- Rsbuild/Rspack 构建与 TanStack Router 路由
- TailwindCSS 与 PostCSS 基础配置
- Vitest 单测与 Playwright E2E 脚本
- Biome 规范化与 `@akistack/tsconfig` 统一 TS 配置

### 解决方案选型（Recommended Stack）

模板沿用 README 中的推荐选型：TypeScript-first、React、TanStack Router、Rsbuild/Rspack、Rslib、Biome、Vitest、Testing Library、Playwright，并偏向在各项目中保持一致的工具链与依赖版本。

### 特色与设计动机

- **一致性优先**：统一命令、统一 lint/format、统一版本目录，降低跨团队协作成本。
- **可治理的依赖关系**：目录层级与标签体系让依赖关系更清晰，可用于自动化检查与模块边界规划。
- **可复现的安装/构建**：冻结锁文件 + 禁止手改，减少“能跑但不可复现”的问题。
- **渐进式演进**：预置但关闭的 build cache/cobuild/subspaces 让模板从小团队到大规模 CI 都能平滑扩展。
