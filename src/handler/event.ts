import { Client } from "discord.js"
import { Options } from "../type"
import { CTSError, debug, get_all_files } from "../function"
import { isMap } from "lodash"
import { join } from "node:path"

export function event_handler(data: NonNullable<Options["events"]>, client: Client) {
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
        const dir = get_all_files(join(__dirname, data))
        console.log(dir)
    }
}
