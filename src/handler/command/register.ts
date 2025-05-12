import { Client } from "discord.js"
import { Command } from "../../type"
import { debug } from "../../function"

export async function register(commands: Map<string, Command>, client: Client<true>) {
    const cmd = Array.from(commands.values()).map((c) => c.data)

    try {
        await client.application.commands.set(cmd)
        debug.info(`Successfully reloaded ${cmd.length} application (/) commands.`)
    } catch (error: any) {
        debug.error(`Error reloading application (/) commands`)
        throw error
    }
}
