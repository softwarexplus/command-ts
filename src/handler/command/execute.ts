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
        let reason

        const stop: StopFunction = (text?: string) => {
            ShouldStop = true
            if (text) {
                reason = text
            } else {
                reason = "No reason provided"
            }
        }

        let index = 0

        for (; index < middleware.length; index++) {
            const fn = middleware[index]
            await fn(command, interaction, stop)
            if (ShouldStop) break
        }

        if (ShouldStop) {
            return debug.info(`A middleware stopped execution`, { index, reason })
        }
    }

    try {
        await run(interaction)
    } catch (error) {
        debug.error(`Error in command ${interaction.commandName} (${interaction.id})`, { error })
        throw error
    }
}
