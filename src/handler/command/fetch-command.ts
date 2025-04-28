import { GetFolderPaths, GetFilePaths, debug, GenerateList } from "../../function"
import { ClientEvents } from "discord.js"
import { Command } from "../../type"

export function ftc_command(data: string) {
    const files = GetFilePaths(data, true).filter((path) => path.endsWith(".js") || path.endsWith(".ts"))
    const commands = new Map<string, Command>()

    for (const file of files) {
        const command: Command = require(file)
        if (!("data" in command)) {
            debug.warn(`Ignoring: Command ${file} does not export "data".`, { command })
            continue
        }

        if (!("run" in command)) {
            debug.warn(`Ignoring: Command ${file} does not export "run".`, { command })
            continue
        }

        commands.set(command.data.name, command)
    }

    debug.info(`${GenerateList("commands", files, data)}`)
    return commands
}
