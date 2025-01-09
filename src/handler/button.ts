import { Client } from "discord.js"
import { Options } from "../type"
import { debug } from "../function"

export function button_handler(data: Options["button"], client: Client) {
    debug.info("Button handler loaded")
}
