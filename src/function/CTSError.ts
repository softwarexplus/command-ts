import { debug } from "./debug"

export class CTSError extends Error {
    constructor(message: string, ...args: unknown[]) {
        super(message)
        this.name = "CTSError"
        debug.error(message, ...args)
    }
}
