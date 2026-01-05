/**
 * Example utility function
 */
export function greet(name: string): string {
    return `Hello, ${name}!`
}

/**
 * Example async utility function
 */
export async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
