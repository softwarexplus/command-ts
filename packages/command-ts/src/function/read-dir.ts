import { readdirSync } from "node:fs"
import { join } from "node:path"

export function GetFilePaths(directory: string, nesting?: boolean): string[] {
    let file_paths: string[] = []

    if (!directory) return file_paths

    const files = readdirSync(directory, { withFileTypes: true })

    for (const file of files) {
        const file_path = join(directory, file.name)

        if (file.isFile()) {
            file_paths.push(file_path)
        }

        if (nesting && file.isDirectory()) {
            file_paths = [...file_paths, ...GetFilePaths(file_path, true)]
        }
    }

    return file_paths
}

export function GetFolderPaths(directory: string, nesting?: boolean): string[] {
    let folder_paths: string[] = []

    if (!directory) return folder_paths

    const folders = readdirSync(directory, { withFileTypes: true })

    for (const folder of folders) {
        const folder_path = join(directory, folder.name)

        if (folder.isDirectory()) {
            folder_paths.push(folder_path)

            if (nesting) {
                folder_paths = [...folder_paths, ...GetFolderPaths(folder_path, true)]
            }
        }
    }

    return folder_paths
}
