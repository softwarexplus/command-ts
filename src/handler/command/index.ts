import { debug } from "../../function"
import { Options } from "../../type"
import { Client } from "discord.js"

export function command_handler(data: Options["command"], client: Client) {
    debug.info("Command handler loaded")
}
