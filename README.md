# ojk-discord-bot v2

A Discord bot built with [discord.js v14](https://discordjs.guide/) and slash commands.

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Create a `.env` file from the template:

   ```sh
   cp .env.example .env
   ```

   Fill in `DISCORD_TOKEN` and `DISCORD_CLIENT_ID` from the
   [Discord Developer Portal](https://discord.com/developers/applications).
   Set `DISCORD_GUILD_ID` for instant command updates during development.

3. Register slash commands with Discord:

   ```sh
   npm run deploy
   ```

   With `DISCORD_GUILD_ID` set, commands deploy instantly to that guild.
   Without it, they deploy globally (can take up to an hour).

4. Start the bot:

   ```sh
   npm start        # production
   npm run dev      # auto-restart on file changes
   ```

## Project structure

```
src/
├── index.js              # entry point: loads commands/events, logs in
├── deploy-commands.js    # registers slash commands with the Discord API
├── config.js             # loads and validates environment variables
├── client.js             # creates the discord.js client
├── commands/             # slash commands, grouped in subdirectories
│   └── general/
│       └── ping.js       # /ping — sample command
├── events/               # event handlers (auto-loaded)
│   ├── ready.js
│   └── interactionCreate.js
└── utils/
    └── logger.js         # leveled console logger
```

## Adding a command

Create a new file in a subdirectory of `src/commands/`, for example
`src/commands/general/hello.js`:

```js
import { SlashCommandBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Says hello'),

  async execute(interaction) {
    await interaction.reply('Hello!')
  },
}
```

Then run `npm run deploy` and restart the bot.

## Environment variables

| Variable             | Required | Description                                  |
| -------------------- | -------- | -------------------------------------------- |
| `DISCORD_TOKEN`      | yes      | Bot token from the Developer Portal          |
| `DISCORD_CLIENT_ID`  | yes      | Application ID                               |
| `DISCORD_GUILD_ID`   | no       | Guild for instant dev command deployment     |
| `LOG_LEVEL`          | no       | `debug`, `info` (default), `warn`, or `error`|
