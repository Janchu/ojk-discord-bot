# OJK Bot

## Table of contents

- [Getting OJK Bot up and running](#getting-ojk-bot-up-and-running)
  - [Requirements](#requirements)
  - [Create a Discord application](#create-a-discord-application)
  - [Config.js](#config.js)
  - [Dependencies](#dependencies)
  - [Run the bot](#run-the-bot)
    - [Development](#development)
    - [Production](#production)

## Getting OJK Bot up and running

### Requirements

**Node.js** 8.0.0 or newer is required. Latest LTS is recommended.

### Create a Discord application

Create a Discord application for your server [here](https://discordapp.com/developers/applications/).

Add a bot to your application and copy its token to config.js described in next step.

Invite the bot to your server in the OAuth2 page using https://discordapp.com/oauth2/authorized as redirect URL, selecting _bot_ as scope and giving it _"Send Messages"_ permission.

### Config.js

Your `config.js` file should look like this. Replace curly brace variables with actual values.

```javascript
export default {
  token: "{token}",
  mashapeKey: "{key}",
  hsApiUrl: "{url}",
  lolApiUrl: "{url}"
};
```

Ask for the API urls from the maintainer of this repository.

### Dependencies

Install dependencies for development environment `npm install`.

> Note that in production environment you can do `npm install --only=prod`.

### Run the bot

#### Development

In development you can run the bot with `npm start`.

#### Production

Build the production version `npm run build`.

Run it with in terminal with `npm run prod` or as a pm2 process `pm2 start build/index.js -i 0 --name "ojk-discord-bot"`
