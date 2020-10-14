Contributing Quickstart
=======================

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
  
## Contribution tips

- **Don't push directly to `master`**. Only merge production-ready code into master.
- Create a branch called `feature/<YOUR NEW FEATURE>`, then submit a pull request when you are ready.
- Copy the `.env.example` file in `packages/frontend/` and `packages/backend/` into a new file called `.env` (in each directory). Contact the team leads for this project for the appropriate values to fill in.

## Code Style

- Before pushing or submitting a pull request, always run `lerna run lint --no-bail` to appropriately format your code.
- Keep each component as modular as possible; ideally only one component per file
- Indent with 2 spaces
- Prefer use of explicit `function` declarations over arrow functions except in callbacks
