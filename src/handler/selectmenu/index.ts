import { Client } from "discord.js"
import { Options } from "../../type"
import { debug } from "../../function"

export function selectmenu_handler(data: Options["selectmenu"], client: Client) {
    debug.info("Select menu handler loaded")
}
