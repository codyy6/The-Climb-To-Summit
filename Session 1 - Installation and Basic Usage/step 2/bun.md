# Initialization and Project Setup
`bun init`:                               Creates a package.json file in the current directory, which stores metadata about your project.  
`bun init -y`:                            Creates a package.json file with default values.  

# Installing Packages
`bun install <PACKAGE_NAME>`:             Installs a package as a dependency in your project.  
`bun install -g <PACKAGE_NAME>`:          Installs a package globally on your system.  
`bun install -D <PACKAGE_NAME>`:  Installs a package as a development dependency, used during development but not in production.

# Running Scripts
`bun run <SCRIPT_NAME>`:                  Runs a script defined in the scripts section of your package.json file.  
`bun start`:                              Runs the default script defined in your package.json (usually for starting a development server).

# Managing Dependencies
`bun list`:                               Lists all installed dependencies and their versions.  
`bun update <PACKAGE_NAME>`:              Updates a specific package to its latest version.  
`bun update`:                             Updates all dependencies to their latest versions.  
`bun uninstall <PACKAGE_NAME>`:           Uninstalls a package from your project.

# Publishing Packages
`bun publish`:                            Publishes your package to the npm registry (requires a public npm account).

# Other Useful Commands
`bun version <VERSION>`:                  Updates the version number in your package.json file.  
`bun link`:                               Creates a symbolic link to your local package, allowing you to test it in other projects.  
`bun audit`:                              Checks your project for known security vulnerabilities.