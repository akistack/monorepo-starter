# @akistack/rush-plugin-akimo

Rush plugin for managing monorepo created from `@akistack/monorepo-starter`.

## Usage in `@akistack/monorepo-starter`

```
rush akimo
```

## Supported Operations

### `init`

Initialize a new monorepo after you cloned the starter template. 

This operation will render essential files and create an IaC configuration file under `common/.iac`.

## Develop Guide

Install the dependencies:

```shell
rush install
```

For local development:

```shell
rushx dev
rushx drytun   # dryrun
```

> Dry-run will skip all procedures wrapped with `withDryrun()`.

Build:

```
pnpm build
```

See also: [Creating Rush plugins](https://rushjs.io/pages/extensibility/creating_plugins/).
