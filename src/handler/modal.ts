import { Client } from "discord.js"
import { Options } from "../type"
import { debug } from "../function"

export function modal_handler(data: Options["modal"], client: Client) {
    debug.info("Modal handler loaded")
}
