import { Command, Middleware, StopFunction } from "../../type"
import { debug } from "../../function"
import { Interaction } from "discord.js"

export async function execute(commands: Map<string, Command>, interaction: Interaction, middleware: Array<Middleware>) {
    if (!interaction.isCommand()) return

    const command = commands.get(interaction.commandName)
    if (!command) return

    const { run } = command
    if (!run || typeof run !== "function") {
        return debug.warn(`Command ${interaction.commandName} does not have a run function`, { command })
    }

    if (middleware && middleware.length) {
        let ShouldStop = false
        let Reason

        const stop: StopFunction = (text?: string) => {
            ShouldStop = true
            if (text) {
                Reason = text
            } else {
                Reason = "No reason provided"
            }
        }

        for (const fn of middleware) {
            await fn(command, interaction, stop)
            if (ShouldStop) break
        }

        if (ShouldStop) {
            return debug.info(`Middleware stopped command ${interaction.commandName}`, { Reason })
        }
    }

    try {
        await run(interaction)
    } catch (error) {
        debug.error(`Error in command ${interaction.commandName}`)
        throw error
    }
}
