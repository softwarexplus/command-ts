export class CTSError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "CTSError"
    }
}
