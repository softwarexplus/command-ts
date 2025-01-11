import { Client } from "discord.js"
import { Options } from "../type"
import { CTSError, debug } from "../function"
import { isMap } from "lodash"

export function event_handler(data: Options["events"], client: Client) {
    debug.info("Event handler loaded")
    if (isMap(data)) {
        data.forEach((fn, name) => {
            if (typeof fn === "function") {
                client.on(name, (...arg) => fn(...arg, client))
            } else {
                debug.error("Event handler must be a function", `name: ${name}`, `function: ${fn}`)
                throw new CTSError("Event handler must be a function")
            }
        })
    } else {
    }
}
