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
    event?: Path<string, (event: ClientEvents[keyof ClientEvents]) => any>
    command?: Path<string, (interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction) => any>
    button?: Path<string, (interaction: ButtonInteraction) => any>
    modal?: Path<string, (interaction: ModalSubmitInteraction) => any>
    selectmenu?: SelectMenu | string
    message_validator?: MessageCommandValidator
    interaction_validator?: InteractionCommandValidator
}

export type SelectMenu = {
    StringSelectMenu?: Path<string, (interaction: StringSelectMenuInteraction) => any>
    UserSelectMenu?: Path<string, (interaction: UserSelectMenuInteraction) => any>
    RoleSelectMenu?: Path<string, (interaction: RoleSelectMenuInteraction) => any>
    MentionableSelectMenu?: Path<string, (interaction: MentionableSelectMenuInteraction) => any>
    ChannelSelectMenu?: Path<string, (interaction: ChannelSelectMenuInteraction) => any>
}

export type Path<key extends string, value extends any> = Map<key, value> | string
export type StopFunction = (reason?: string) => void

export type Command = {
    data: RESTPostAPIApplicationCommandsJSONBody
    autocomplete?: (interaction: AutocompleteInteraction) => any
    run?: (interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction) => any
    execute?: (message: ClientEvents["messageCreate"][0]) => any
}

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
