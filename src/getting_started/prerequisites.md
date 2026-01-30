# Prerequisites

Before you can build or use **NextStd**, you need to ensure your development environment is set up with the necessary tools.

Since **NextStd** bridges two languages, you will need toolchains for both **Rust** and **C**.

```admonish note title="Platform Support"
NextStd is currently tested primarily on **Linux** (x86_64). macOS and Windows support is experimental.

```

## 1. The Rust Toolchain

The backend logic of NextStd is written in Rust. You need the Rust compiler (`rustc`) and the package manager (`cargo`).

**Check if installed:**

```bash
cargo --version

```

**How to install:**
If you don't have it, install it via `rustup` (the recommended way):

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

```

*Restart your terminal after installation.*

## 2. C Compiler (GCC or Clang)

To compile the frontend C code and link it with the Rust backend, you need a standard C compiler.

**Check if installed:**

```bash
gcc --version
# OR
clang --version

```

**How to install:**

* **Ubuntu/Debian:** `sudo apt install build-essential`
* **Fedora:** `sudo dnf groupinstall "Development Tools"`
* **macOS:** `xcode-select --install`
* **Windows:** Install [MinGW-w64](https://www.google.com/search?q=https://www.mingw-w64.org/) or use WSL2 (Recommended).

## 3. Make

We use `Make` to automate the complex process of compiling the Rust static library, compiling the C object files, and linking them together.

**Check if installed:**

```bash
make --version

```

**How to install:**

* **Linux:** Usually pre-installed. If not: `sudo apt install make`
* **macOS:** Included with Xcode command line tools.
* **Windows:** Install via typical package managers (Chocolatey, Scoop) or use `mingw32-make`.

## 4. Summary of Requirements

| Tool | Purpose | Minimum Version |
| --- | --- | --- |
| **Cargo** | Builds the Rust backend library (`libns_io.a`) | 1.70+ |
| **GCC/Clang** | Compiles your `.c` files and links binaries | GCC 9+ / Clang 10+ |
| **Make** | Orchestrates the build process | 3.81+ |

Once you have these tools ready, proceed to the [Installation](./installation.md) guide.
