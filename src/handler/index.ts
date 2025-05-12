import { selectmenu_handler } from "./selectmenu"
import { CTSError, debug } from "../function"
import { command_handler } from "./command"
import { button_handler } from "./button"
import { event_handler } from "./event"
import { modal_handler } from "./modal"
import { Options } from "../type"
import { version } from "discord.js"

export let IsDebugEnabled = false

export function handler({ debug: dbg, client, event, command, button, modal, selectmenu, middleware }: Options) {
    const djs = Number(version.split(".").reduce((x, y, i) => (i === 2 ? x : `${x}.${y}`)))
    IsDebugEnabled = typeof dbg === "boolean" ? dbg : false

    if (djs < 14 || djs > 15) {
        debug.warn("Your discord.js version might not be fully supported by command-ts handler")
    }

    if (!client) {
        debug.error("Client is required", { received: client })
        throw new CTSError("Client is required")
    }

    if (event) event_handler(event, client)
    if (button) button_handler(button, client)
    if (modal) modal_handler(modal, client)
    if (selectmenu) selectmenu_handler(selectmenu, client)
    if (command) command_handler(command, client, middleware)
    debug.info("All Handler loaded")
    // if (interaction_validator) interaction_validator_handler(interaction_validator, client)
    // if (message_validator) message_validator_handler(message_validator, client)
}
