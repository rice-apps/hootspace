# hootspace

An open-source community forum for Rice University students maintained by [riceapps](http://www.riceapps.org/)

You can try it out now [at this link](https://hootspace.riceapps.org/)

## Get started with developing

Install the following basic dependencies:

- NodeJS LTS
  - Download from [the official website](https://nodejs.org/en/)
  - Alternatively, use a NodeJS version manager like [`nvm`](https://github.com/nvm-sh/nvm)
- Yarn 1
  - This is an alternative package manager to Node's default `npm`
  - To install, run `npm i -g yarn` at your terminal
- Lerna
  - This is used to manage a multi-package repository
  - To install, run `npm i -g lerna` at your terminal

Clone the repository.

```bash
$ git clone https://github.com/rice-apps/hootspace.git
$ cd hootspace
```

Install repository-wide dependencies **using Lerna only**.

```bash
$ lerna bootstrap
```

New dependencies in the `packages/frontend/` or `packages/backend/` folders can still be installed using `yarn add <PACKAGE>`.

To refresh packages after installing or updating new packages, run `lerna clean` then `lerna bootstrap`.

## Contribution tips

- **Don't push directly to `master`**. Only merge production-ready code into master.
- Create a branch called `feature/<YOUR NEW FEATURE>`, then submit a pull request when you are ready.
- Copy the `.env.example` file in `packages/frontend/` and `packages/backend/` into a new file called `.env` (in each directory). Contact the team leads for this project for the appropriate values to fill in.

## Code Style

- Before pushing or submitting a pull request, always run `lerna run lint --no-bail` to appropriately format your code.
- Keep each component as modular as possible; ideally only one component per file
- Indent with 2 spaces
- Prefer use of explicit `function` declarations over arrow functions except in callbacks
