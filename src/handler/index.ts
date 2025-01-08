import { Client } from "discord.js"
import { CTSError } from "../function"
import { Options } from "../type"

export let IsDebugEnabled = false

export function handler({
    debug,
    client,
    command_path,
    component_path,
    event_path,
    interaction_validator,
    message_validator
}: Options) {
    IsDebugEnabled = debug ?? false

    if (!client) throw new CTSError("Client is required")
    if (client instanceof Client === false) throw new CTSError("Client must be an instance of Discord.Client")

    if (event_path) {
    }

    if (command_path) {
    }

    if (component_path) {
    }
}
