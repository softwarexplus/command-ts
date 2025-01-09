import { Client } from "discord.js"
import { SelectMenu } from "../../type"
import { debug } from "../../function"

export function string_handler(data: SelectMenu["StringSelectMenu"], client: Client) {
    debug.info("String select menu handler loaded")
}
