import { PathLike, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { debug } from "./debug"

export function get_all_files(BasePath: PathLike): Array<string> {
    try {
        let result: Array<string> = []
        const files = readdirSync(BasePath)

        for (const file of files) {
            const path = join(BasePath.toString(), file)
            const stats = statSync(path)
            stats.isDirectory() ? (result = result.concat(get_all_files(path))) : result.push(path)
        }

        return result.map((file) => file.replace(/\\/g, "/"))
    } catch (error) {
        throw error
    }
}

export function ReadDirectory(path: PathLike): Array<string> {
    try {
        return get_all_files(path).map((file) => file.replace(`${path.toString()}/`, ""))
    } catch (error) {
        error instanceof Error ? debug.error(error.message) : debug.error(error)
        throw error
    }
}
