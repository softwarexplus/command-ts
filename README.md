# command-ts

[![Discord](https://img.shields.io/discord/1211530334458617866?style=flat&logo=discord&logoColor=ffffff&color=5865f2)](https://discord.gg/FaCCaFM74Q)
[![GitHub Action](https://github.com/softwarexplus/command-ts/actions/workflows/test.yaml/badge.svg)](https://github.com/softwarexplus/command-ts/actions)
[![NPM Version](https://img.shields.io/npm/v/command-ts)](https://www.npmjs.com/package/command-ts)
[![NPM Downloads](https://img.shields.io/npm/dy/command-ts)](https://www.npmjs.com/package/command-ts)
[![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/command-ts)](https://www.npmjs.com/package/command-ts)
[![NPM License](https://img.shields.io/npm/l/command-ts)](https://github.com/softwarexplus/command-ts/blob/main/LICENSE)

A package for handling discord.js commands with TypeScript

## Installation

To install command-ts, run one of the following commands based on your preferred package manager:

#### NPM

```sh
npm install command-ts
```

#### PNPM

```sh
pnpm add command-ts
```

#### Yarn

```sh
yarn add command-ts
```

## Usage

```typescript
import { handler } from "command-ts"
import { Client, GatewayIntentBits } from "discord.js"

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})

handler({
    client,
    debug: true, // Enable debug logging
    command: "./commands", // Path to commands folder
    event: "./events", // Path to events folder
    button: "./buttons", // Path to button handlers
    modal: "./modals", // Path to modal handlers
    selectmenu: "./selectmenus" // Path to select menu handlers
})

client.login("YOUR_TOKEN")
```

### Command Structure

Create a command file in your commands folder:

```typescript
import { Command } from "command-ts"

export const command: Command = {
    data: {
        name: "ping",
        description: "Replies with pong!"
    },
    run: async (interaction) => {
        await interaction.reply("Pong!")
    }
}
```

## API Documentation

### Handler Options

The `handler` function accepts an options object with the following properties:

```typescript
type Options = {
    client: Client // Discord.js client instance (required)
    debug?: boolean // Enable debug logging
    event?: string | EventMap // Path to events folder or event map
    command?: string | CommandMap // Path to commands folder or command map
    button?: string | ButtonMap // Path to button handlers or button map
    modal?: string | ModalMap // Path to modal handlers or modal map
    selectmenu?: SelectMenu | string // Path to select menu handlers or select menu config
    middleware?: Middleware | Middleware[] // Command middleware functions
}
```

### Command Types

Commands must implement the `Command` Types:

```typescript
type Command = {
    data: RESTPostAPIApplicationCommandsJSONBody // Command registration data
    autocomplete?: (interaction: AutocompleteInteraction) => any // Optional autocomplete handler
    run: (interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction) => any
}
```

### SelectMenu Types

The SelectMenu configuration supports different menu types:

```typescript
type SelectMenu = {
    StringSelectMenu?: string | ((interaction: StringSelectMenuInteraction) => any)
    UserSelectMenu?: string | ((interaction: UserSelectMenuInteraction) => any)
    RoleSelectMenu?: string | ((interaction: RoleSelectMenuInteraction) => any)
    MentionableSelectMenu?: string | ((interaction: MentionableSelectMenuInteraction) => any)
    ChannelSelectMenu?: string | ((interaction: ChannelSelectMenuInteraction) => any)
}
```

### Middleware

Middleware functions can be used to add custom logic before command execution:

```typescript
type Middleware = (command: Command, interaction: CommandInteraction, stop: (reason?: string) => void) => any
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for details.
