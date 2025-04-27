import { Client } from "discord.js"
import { CTSError, debug } from "../function"
import { Options } from "../type"
import { event_handler } from "./event"
import { button_handler } from "./button"
import { command_handler } from "./command"
import { modal_handler } from "./modal"
import { selectmenu_handler } from "./selectmenu"

export let IsDebugEnabled = false

export function handler({
    debug: dbg,
    client,
    events,
    commands,
    button,
    modal,
    selectmenu,
    interaction_validator,
    message_validator
}: Options) {
    IsDebugEnabled = typeof dbg === "boolean" ? dbg : false

    if (!client) {
        debug.error("Client is required", { received: client })
        throw new CTSError("Client is required")
    }

    if (events) event_handler(events, client)
    if (commands) command_handler(commands, client)
    if (button) button_handler(button, client)
    if (modal) modal_handler(modal, client)
    if (selectmenu) selectmenu_handler(selectmenu, client)
    debug.info("Handler loaded")
    // if (interaction_validator) interaction_validator_handler(interaction_validator, client)
    // if (message_validator) message_validator_handler(message_validator, client)
}
