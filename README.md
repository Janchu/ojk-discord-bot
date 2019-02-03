# ojk-discord-bot


## Requirements


### Node

Node.js 6.0.0 or newer is required.

**Ubuntu:** Installation instructions can be found [here](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions).

**Windows:** Download LTS or current .msi from [here](https://nodejs.org/en/download/) and install. Or with [chocolatey](https://chocolatey.org/): `choco install nodejs-lts` (LTS) or `choco install nodejs` (current)


### Node Package manager

Node ships with `npm`.

`yarn` can be used as an alternative for `npm`.

Yarn installation instructions for all operating systems can be found [here](https://yarnpkg.com/lang/en/docs/install/).


## Getting started

### Install dependencies

Projects dependencies are listed in `package.json`

```bash
npm install
```

### Start development server

```bash
npm start
```


## Production

Build the production version
```bash
npm run prod
```

Run the production version as a pm2 process
```bash
pm2 start build/index.js -i 0 --name "ojk-discord-bot"
```