import { Client } from "discord.js"
import { SelectMenu } from "../../type"
import { debug } from "../../function"

export function role_handler(data: SelectMenu["RoleSelectMenu"], client: Client) {
    debug.info("Role select menu handler loaded")
}
