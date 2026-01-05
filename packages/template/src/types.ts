/**
 * Example configuration type
 */
export interface Config {
    name: string
    version: string
    enabled: boolean
}

/**
 * Example result type
 */
export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E }
