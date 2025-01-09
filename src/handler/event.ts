import { Client } from "discord.js"
import { Options } from "../type"
import { debug } from "../function"

export function event_handler(data: Options["event"], client: Client) {
    debug.info("Event handler loaded")
}
