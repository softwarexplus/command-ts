import { readdirSync } from "node:fs"
import { join } from "node:path"

export function GetFilePaths(directory: string, nesting?: boolean): string[] {
    let filePaths: string[] = []

    if (!directory) return filePaths

    const files = readdirSync(directory, { withFileTypes: true })

    for (const file of files) {
        const filePath = join(directory, file.name)

        if (file.isFile()) {
            filePaths.push(filePath)
        }

        if (nesting && file.isDirectory()) {
            filePaths = [...filePaths, ...GetFilePaths(filePath, true)]
        }
    }

    return filePaths
}

export function GetFolderPaths(directory: string, nesting?: boolean): string[] {
    let folderPaths: string[] = []

    if (!directory) return folderPaths

    const folders = readdirSync(directory, { withFileTypes: true })

    for (const folder of folders) {
        const folderPath = join(directory, folder.name)

        if (folder.isDirectory()) {
            folderPaths.push(folderPath)

            if (nesting) {
                folderPaths = [...folderPaths, ...GetFolderPaths(folderPath, true)]
            }
        }
    }

    return folderPaths
}
