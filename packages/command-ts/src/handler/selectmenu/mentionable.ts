import { Client } from "discord.js"
import { SelectMenu } from "../../type"
import { debug } from "../../function"

export function mentionable_handler(data: SelectMenu["MentionableSelectMenu"], client: Client) {
    debug.info("Mentionable select menu handler loaded")
}
