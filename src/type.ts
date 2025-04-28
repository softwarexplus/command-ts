import {
    AutocompleteInteraction,
    ChannelSelectMenuInteraction,
    ChatInputCommandInteraction,
    Client,
    ClientEvents,
    ContextMenuCommandInteraction,
    MentionableSelectMenuInteraction,
    RESTPostAPIApplicationCommandsJSONBody,
    RoleSelectMenuInteraction,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction,
    ModalSubmitInteraction,
    ButtonInteraction
} from "discord.js"

export type Options = {
    client: Client
    debug?: boolean
    event?: PathOR<keyof ClientEvents, ((...arg: any) => any) | Array<(...arg: any) => any>>
    command?: PathOR<string, Command>
    button?: PathOR<string, (interaction: ButtonInteraction) => any>
    modal?: PathOR<string, (interaction: ModalSubmitInteraction) => any>
    selectmenu?: SelectMenu | string
    middleware?: Array<Middleware> | Middleware
}

// export type Commands = {
//     ChatInput?: PathOR<string, (interaction: ChatInputCommandInteraction) => any>
//     Context?: PathOR<string, (interaction: ContextMenuCommandInteraction) => any>
// }

export type SelectMenu = {
    StringSelectMenu?: PathOR<string, (interaction: StringSelectMenuInteraction) => any>
    UserSelectMenu?: PathOR<string, (interaction: UserSelectMenuInteraction) => any>
    RoleSelectMenu?: PathOR<string, (interaction: RoleSelectMenuInteraction) => any>
    MentionableSelectMenu?: PathOR<string, (interaction: MentionableSelectMenuInteraction) => any>
    ChannelSelectMenu?: PathOR<string, (interaction: ChannelSelectMenuInteraction) => any>
}

export type PathOR<key extends string, value extends any> = Map<key, value> | string
export type StopFunction = (reason?: string) => void

export type Command = {
    data: RESTPostAPIApplicationCommandsJSONBody
    autocomplete?: (interaction: AutocompleteInteraction) => any
    run: (interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction) => any
}

export type Middleware = (
    command: Command,
    interaction: ClientEvents["interactionCreate"][0],
    stop: StopFunction
) => any

/*
export type Handler = {
    events?: string
    commands?: string | CommandHandler
    components?: string | ComponentHandler
}

export type CommandHandler = {
    ChatInput?: string
    Context?: string
}

export type ComponentHandler = {
    Button?: string
    Modal?: string
    SelectMenu?: string | SelectMenuComponentHandler
}

export type SelectMenuComponentHandler = {
    StringSelectMenu?: string
    UserSelectMenu?: string
    RoleSelectMenu?: string
    MentionableSelectMenu?: string
    ChannelSelectMenu?: string
}
*/
