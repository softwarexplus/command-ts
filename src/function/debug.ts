import { blue, green, yellow, red, gray } from "colorette"
import { IsDebugEnabled } from "../handler"
import { inspect } from "node:util"

export const enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}

type LoggerConfig = {
    minLevel: LogLevel
    includeTimestamp: boolean
    dateFormat: Intl.DateTimeFormatOptions
    timeFormat: Intl.DateTimeFormatOptions
}

const defaultConfig: LoggerConfig = {
    minLevel: LogLevel.DEBUG,
    includeTimestamp: true,
    dateFormat: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    },
    timeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }
}

const getTimestamp = (config: LoggerConfig): string => {
    if (!config.includeTimestamp) return ""

    const date = new Date()
    const dateStr = date.toLocaleDateString(undefined, config.dateFormat)
    const timeStr = date.toLocaleTimeString(undefined, config.timeFormat)
    return `[${dateStr} ${timeStr}]`
}

const shouldLog = (level: string, config: LoggerConfig): boolean => {
    const levelMap: Record<string, LogLevel> = {
        DEBUG: LogLevel.DEBUG,
        INFO: LogLevel.INFO,
        WARN: LogLevel.WARN,
        ERROR: LogLevel.ERROR
    }
    return levelMap[level] >= config.minLevel
}

const formatArgs = (args: unknown[]) => {
    if (args.length === 0) return ""
    let str = ""

    for (const obj of args) {
        str += inspect(obj, { colors: true, depth: Infinity })
        str += " "
    }

    return str
}

const createLog =
    (config: LoggerConfig) =>
    (level: string, color: (str: string) => string, message: unknown, ...args: unknown[]): void => {
        if (shouldLog(level, config)) {
            const timestamp = getTimestamp(config)
            const levelStr = color(`[${level}]`)
            const formattedArgs = formatArgs(args)

            if (IsDebugEnabled) {
                console.log(`${blue(timestamp)} ${levelStr} ${message} ${formattedArgs}`)
            }
        }
    }

const createLogger = (customConfig: Partial<LoggerConfig> = {}) => {
    const config = { ...defaultConfig, ...customConfig }
    const log = createLog(config)

    return {
        debug: (message: unknown, ...args: unknown[]) => log("DEBUG", gray, message, ...args),
        info: (message: unknown, ...args: unknown[]) => log("INFO", green, message, ...args),
        warn: (message: unknown, ...args: unknown[]) => log("WARN", yellow, message, ...args),
        error: (message: unknown, ...args: unknown[]) => log("ERROR", red, message, ...args)
    }
}

export const debug = createLogger()
export { createLogger }
