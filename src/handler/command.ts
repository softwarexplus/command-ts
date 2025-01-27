import { Client } from "discord.js"
import { Options } from "../type"
import { debug } from "../function"

export function command_handler(data: Options["commands"], client: Client) {
    debug.info("Command handler loaded")
}
