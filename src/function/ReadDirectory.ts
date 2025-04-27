import { PathLike, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { debug } from "./debug"
import { TreeNode } from "../type"

export function ReadDirectory(path: PathLike): Record<string, TreeNode> {
    try {
        const paths = get_all_files(path).map((file) => file.replace(`${path.toString()}/`, ""))
        const root: Record<string, TreeNode> = {}

        for (const filePath of paths) {
            const parts = filePath.split("/")
            let current = root

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i]
                const isFile = i === parts.length - 1

                if (!current[part]) {
                    if (isFile) {
                        current[part] = { type: "file" }
                    } else {
                        current[part] = { type: "folder", children: {} }
                    }
                }

                if (!isFile && current[part].type === "folder") {
                    current = current[part].children
                }
            }
        }

        return root
    } catch (error) {
        error instanceof Error ? debug.error(error.message) : debug.error(error)
        throw error
    }
}

function get_all_files(BasePath: PathLike): Array<string> {
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
        error instanceof Error ? debug.error(error.message) : debug.error(error)
        throw error
    }
}
