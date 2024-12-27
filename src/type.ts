import { Client, ClientEvents } from "discord.js"

export type Options = {
    client: Client
    options?: BaseOptions
    handler?: Handler
}

export type BaseOptions = {
    debug?: boolean
    interaction_function_name?: string
    message_function_name?: string
    handler?: HandlerFunction
}

export type HandlerFunction = {
    interaction?: (interaction: ClientEvents["interactionCreate"][0], stop: () => void) => any
    message?: (message: ClientEvents["messageCreate"][0], stop: () => void) => any
}

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
