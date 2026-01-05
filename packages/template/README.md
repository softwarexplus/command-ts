# @command-ts/template

A template package for the command-ts monorepo.

## Installation

```bash
pnpm add @command-ts/template
```

## Usage

```typescript
import { greet, delay } from "@command-ts/template"

// Basic greeting
console.log(greet("World")) // Hello, World!

// Async delay
await delay(1000)
```

## Types

```typescript
import type { Config, Result } from "@command-ts/template"

const config: Config = {
    name: "my-app",
    version: "1.0.0",
    enabled: true
}

const result: Result<string> = {
    success: true,
    data: "Hello"
}
```
