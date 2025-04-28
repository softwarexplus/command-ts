import { cyan, yellow, magenta } from "colorette"
import path from "path"

export function GenerateList(filePaths: string[], srcDir: string): string {
    const event: string[] = []
    const commandCount = filePaths.length

    // Create directory structure from file paths
    const directoryStructure: Record<string, any> = {}

    for (const filePath of filePaths) {
        // Skip files not in src directory
        if (!filePath.startsWith(srcDir)) continue

        // Get relative path from src
        const relativePath = filePath.substring(srcDir.length + 1)
        const pathParts = relativePath.split(path.sep)

        // File name without extension
        const fileName = path.basename(pathParts[pathParts.length - 1], ".ts")

        // Build directory structure
        let currentLevel = directoryStructure

        // Process each directory in the path
        for (let i = 0; i < pathParts.length - 1; i++) {
            const part = pathParts[i]

            if (!currentLevel[part]) {
                currentLevel[part] = { __files: [] }
            }

            currentLevel = currentLevel[part]
        }

        // Add file to the current directory
        currentLevel.__files.push(fileName)
    }

    // Generate formatted command list from directory structure
    function processStructure(structure: Record<string, any>, level: number = 0): void {
        // Process directories first
        for (const dir in structure) {
            if (dir === "__files") continue

            const indent = "  ".repeat(level)
            event.push(`${indent}├─ ${cyan(dir)}`)

            // Process subdirectories and files
            processStructure(structure[dir], level + 1)
        }

        // Process files
        if (structure.__files) {
            const indent = "  ".repeat(level)
            for (const file of structure.__files) {
                event.push(`${indent}├─ ${yellow(file)}`)
            }
        }
    }

    // Generate command list
    processStructure(directoryStructure)

    // Add summary at the beginning
    event.unshift(`Loaded ${magenta(commandCount.toString())} event:`)

    return event.join("\n")
}
