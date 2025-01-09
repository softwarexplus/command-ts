import { Client } from "discord.js"
import { SelectMenu } from "../../type"
import { debug } from "../../function"

export function channel_handler(data: SelectMenu["ChannelSelectMenu"], client: Client) {
    debug.info("Channel select menu handler loaded")
}
