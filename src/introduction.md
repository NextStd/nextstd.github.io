# Introduction

Welcome to the official documentation for **NextStd**.

```admonish warning title="Experimental Software"
**NextStd** is currently in active development (Alpha). 
While the core printing logic is memory-safe, the API is subject to breaking changes. Do not use in mission-critical production systems yet.

```

## What is NextStd?

**NextStd** is a modern, memory-safe alternative to the C standard library (`stdio.h`), built entirely on a **Rust** backend.

It aims to solve the biggest problem in C development: **Safety.** By offloading complex I/O operations to Rust, we can guarantee memory safety, eliminate buffer overflows, and provide modern features—all while maintaining the familiar syntax and performance of C.

## Why Replace `stdio.h`?

The standard C library is powerful but dangerous. A single mistake in a `printf` format specifier can crash your program or open security vulnerabilities.

**NextStd** fixes this by introducing a modern API layer:

1. **Type Safety:** No more `%d` or `%s`. We use C11 `_Generic` macros to automatically detect types.
2. **Memory Safety:** The backend implementation uses Rust's `std::io`, ensuring that buffer overflows are structurally impossible in the library itself.
3. **Modern Ergonomics:** Clean, readable function calls that look like 2026, not 1972.

## A Quick Comparison

### Standard C (The Old Way)

```c
#include <stdio.h>

int main() {
    float x = 3.14;
    // ⚠️ RISK: Wrong specifier (%d) for float leads to undefined behavior
    printf("Value: %d\n", x); 
    return 0;
}

```

### NextStd (The New Way)

```c
#include "ns_io.h"

int main() {
    float x = 3.14;
    // ✅ SAFE: Automatically routed to ns_print_float()
    ns_print(x); 
    return 0;
}

```

## How It Works

**NextStd** is not just a wrapper. It is a bridge between two worlds:

* **Frontend (C):** Uses standard headers and `extern "C"` definitions.
* **Bridge (FFI):** Handles the raw pointer translation.
* **Backend (Rust):** Executes the logic with full memory safety guarantees.

Check out the [Architecture](./concepts/architecture.md) section to deep dive into the internal design.

