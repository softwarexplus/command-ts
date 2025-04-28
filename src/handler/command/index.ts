import { debug } from "../../function"
import { Options } from "../../type"
import { Client } from "discord.js"
import { ftc_command } from "./fetch-command"
import { isMap } from "lodash"

export function command_handler(
    data: NonNullable<Options["command"]>,
    client: Client,
    middleware: Options["middleware"]
) {
    if (middleware) middleware = typeof middleware === "function" ? [middleware] : middleware
    const commands = isMap(data) ? data : ftc_command(data)

    debug.info("Command handler loaded")
}
