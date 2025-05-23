import { GetFilePaths, debug, GenerateList } from "../../function"
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

    debug.debug(`${GenerateList("commands", files, data)}`)
    debug.debug(`Found ${commands.size} commands`, { commands })

    return commands
}
