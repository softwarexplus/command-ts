import { Client } from "discord.js"
import { SelectMenu } from "../../type"
import { debug } from "../../function"

export function user_handler(data: SelectMenu["UserSelectMenu"], client: Client) {
    debug.info("User select menu handler loaded")
}
