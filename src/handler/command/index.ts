import { debug } from "../../function"
import { Options } from "../../type"
import { Client } from "discord.js"

export function command_handler(data: Options["command"], client: Client, middleware: Options["middleware"]) {
    if (middleware) middleware = typeof middleware === "function" ? [middleware] : middleware
    debug.info("Command handler loaded")
}
