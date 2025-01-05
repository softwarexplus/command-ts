import {
    AutocompleteInteraction,
    ChatInputCommandInteraction,
    Client,
    ClientEvents,
    ContextMenuCommandInteraction,
    RESTPostAPIApplicationCommandsJSONBody
} from "discord.js"

export type Options = {
    client: Client
    debug?: boolean
    event_path?: string
    command_path?: string
    component_path?: string
    message_validator?: MessageCommandValidator
    interaction_validator?: InteractionCommandValidator
}

export type Command = {
    data: RESTPostAPIApplicationCommandsJSONBody
    autocomplete?: (interaction: AutocompleteInteraction) => any
    run?: (interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction) => any
    execute?: (message: ClientEvents["messageCreate"][0]) => any
}

export type StopFunction = (reason?: string) => void

export type MessageCommandValidator = (
    command: Command,
    message: ClientEvents["messageCreate"][0],
    stop: StopFunction
) => any

export type InteractionCommandValidator = (
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
