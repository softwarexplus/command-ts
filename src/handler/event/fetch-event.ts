import { GetFolderPaths, GetFilePaths, debug, GenerateList } from "../../function"
import { ClientEvents } from "discord.js"

export function ftc_event(data: string) {
    const EventFolderPaths = GetFolderPaths(data)
    const FilePaths = []
    const event = new Map<keyof ClientEvents, Array<(...arg: any) => any>>()

    for (const EventFolderPath of EventFolderPaths) {
        const eventName = EventFolderPath.replace(/\\/g, "/").split("/").pop() as string

        const EventFilePaths = GetFilePaths(EventFolderPath, true).filter(
            (path) => path.endsWith(".js") || path.endsWith(".ts")
        )

        const fun: Array<(...arg: any) => any> = []
        for (const EventFilePath of EventFilePaths) {
            const obj = require(EventFilePath)
            const fn = typeof obj === "function" ? obj : obj.default

            if (typeof fn !== "function") {
                debug.warn(`Ignoring: Event ${EventFilePath} does not export a function.`, { obj })
                continue
            }

            FilePaths.push(EventFilePath)
            fun.push(fn)
        }

        event.set(eventName as any, fun)
    }

    debug.info(`${GenerateList("events", FilePaths, data)}`)
    return event
}
