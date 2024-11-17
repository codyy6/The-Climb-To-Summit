# Initialization and Configuration:
`git init`:                                       Creates a new Git repository in the current directory.  
`git config --global user.name <YOUR_NAME>`:        Sets your name globally for Git commits.  
`git config --global user.email <YOUR_EMAIL>`:      Sets your email address globally for Git commits.

# Working with Files:
`git add <FILE_NAME>`:                             Adds a file to the staging area for the next commit.  
`git add .`:                                      Adds all modified and untracked files to the staging area.  
`git status`:                                     Shows the current status of the repository, including modified, staged, and untracked files.  
`git diff`:                                       Shows the differences between the working directory and the staging area.  
`git rm <FILE_NAME>`:                              Removes a file from the repository.

# Committing Changes:
`git commit -m "<COMMIT_MESSAGE>"`:                 Commits the staged changes with a specified message.  
`git commit --amend`:                             Modifies the previous commit's message or adds more changes.

# Viewing History:
`git log`:                                        Shows the commit history of the repository.  
`git log --oneline`:                              Shows the commit history in a concise one-line format.  
`git reflog`:                                     Shows a log of recent actions performed on the repository.

# Branching and Merging:
`git branch <BRANCH_NAME>`:                        Creates a new branch.  
`git checkout <BRANCH_NAME>`:                      Switches to the specified branch.  
`git branch -d <BRANCH_NAME>`:                     Deletes a branch.  
`git merge <BRANCH_NAME>`:                         Merges the specified branch into the current branch.

# Remote Repositories:
`git remote add origin <REMOTE_URL>`:             Adds a remote repository.  
`git push origin <BRANCH_NAME>`:                   Pushes the current branch to the remote repository.  
`git pull origin <BRANCH_NAME>`:                   Pulls changes from the remote repository into the current branch.

# Additional Commands:
`git reset --hard HEAD`:                          Discards all uncommitted changes.  
`git stash`:                                      Temporarily saves uncommitted changes.  
`git stash pop`:                                  Applies the most recent stashed changes.  
`git tag <TAG_NAME>`:                              Creates a tag at the current commit.