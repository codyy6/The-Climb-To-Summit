# Creating a New Project:
cargo new <project-name>:   Creates a new Rust project with a basic structure.

# Building a Project:
cargo build:                Builds the project in release mode.
cargo build --release:      Builds the project in release mode with optimizations.
cargo check:                Checks the code for errors without building.

# Running a Project:
cargo run:                  Builds and runs the project.
cargo run --release:        Builds and runs the project in release mode.

# Managing Dependencies:
cargo add <crate-name>:     Adds a dependency to the project.
cargo remove <crate-name>:  Removes a dependency from the project.
cargo update:               Updates all dependencies to their latest versions.

# Formatting and Linting:
cargo fmt:                  Formats the code according to Rust style guidelines.
cargo clippy:               Checks the code for common style and performance issues.

# Other Useful Commands:
cargo doc:                  Generates documentation for the project.
cargo test:                 Runs tests defined in the project.
cargo bench:                Measures the performance of the project.
cargo init:                 Initializes a new Cargo project in the current directory.