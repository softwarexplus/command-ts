import { autocomplete } from "./autocomplete"
import { ftc_command } from "./fetch-command"
import { debug } from "../../function"
import { register } from "./register"
import { Options } from "../../type"
import { execute } from "./execute"
import { Client, InteractionType } from "discord.js"
import { isMap } from "lodash"

export function command_handler(
    data: NonNullable<Options["command"]>,
    client: Client,
    middleware: Options["middleware"]
) {
    if (middleware) middleware = typeof middleware === "function" ? [middleware] : middleware
    const commands = isMap(data) ? data : ftc_command(data)

    client.on("ready", async (client) => await register(commands, client))
    client.on("interactionCreate", async (interaction) => {
        debug.info(`Command handler triggered`, { id: interaction.id, type: InteractionType[interaction.type] })
        await execute(commands, interaction, middleware ?? ([] as any))
        await autocomplete(commands, interaction)
    })

    debug.info("Command handler loaded")
}
