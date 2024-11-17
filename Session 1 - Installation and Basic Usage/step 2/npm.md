# Initialization and Project Setup
`npm init`:                               Creates a package.json file in the current directory, which stores metadata about your project.  
`npm init -y`:                            Creates a package.json file with default values.  

# Installing Packages
`npm install <PACKAGE_NAME>`:             Installs a package as a dependency in your project.  
`npm install -g <PACKAGE_NAME>`:          Installs a package globally on your system.  
`npm install -D <PACKAGE_NAME>`:  Installs a package as a development dependency, used during development but not in production.

# Running Scripts
`npm run <SCRIPT_NAME>`:                  Runs a script defined in the scripts section of your package.json file.  
`npm start`:                              Runs the default script defined in your package.json (usually for starting a development server).

# Managing Dependencies
`npm list`:                               Lists all installed dependencies and their versions.  
`npm update <PACKAGE_NAME>`:              Updates a specific package to its latest version.  
`npm update`:                             Updates all dependencies to their latest versions.  
`npm uninstall <PACKAGE_NAME>`:           Uninstalls a package from your project.

# Publishing Packages
`npm publish`:                            Publishes your package to the npm registry (requires a public npm account).

# Other Useful Commands
`npm version <VERSION >`:                  Updates the version number in your package.json file.  
`npm link`:                               Creates a symbolic link to your local package, allowing you to test it in other projects.  
`npm audit`:                              Checks your project for known security vulnerabilities.