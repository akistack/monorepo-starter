# Maintainer's Guide

Welcome to the Rush monorepo template provided by `@akistack`. This template helps you create a new monorepo that integrates our recommended standards and solutions with less effort.

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
git commit -m "feat(all): create monorepo from template"
git push -u origin main
```

## Template Introduction



<!-- TODO -->
