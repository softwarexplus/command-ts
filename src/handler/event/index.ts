import { FetchFunction } from "./fetch-function"
import { debug } from "../../function"
import { Options } from "../../type"
import { OnEvent } from "./on-event"
import { Client } from "discord.js"
import { isMap } from "lodash"

export function event_handler(data: NonNullable<Options["event"]>, client: Client) {
    OnEvent(client, isMap(data) ? data : FetchFunction(data))
    debug.info("Event handler loaded")
}
