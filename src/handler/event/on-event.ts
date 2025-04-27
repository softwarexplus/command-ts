import { debug, CTSError } from "../../function"
import { Client, ClientEvents } from "discord.js"
import { isMap } from "lodash"

export function OnEvent(
    client: Client,
    map: Map<keyof ClientEvents, ((...arg: any) => any) | Array<(...arg: any) => any>>
) {
    if (!isMap(map)) {
        debug.error("Event handler must be a Map", { received: map })
        throw new CTSError("Event handler must be a Map")
    }

    for (const [name, fn] of map) {
        const func = typeof fn === "function" ? [fn] : fn
        for (const fn of func) {
            if (typeof fn === "function") {
                client.on(name, (...arg) => fn(...arg, client))
            } else {
                debug.error("Event handler must be a function", `name: ${name}`, `function: ${fn}`)
                throw new CTSError("Event handler must be a function")
            }
        }
    }
}
