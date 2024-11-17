# Step-by-Step Tutorial: Creating a React Application and Pushing to GitHub

## Step 1: Create a New Repository on GitHub

1. Go to GitHub and log in to your account.
2. Click the "+" icon in the top right corner and select "New repository".
3. Name your repository and click "Create repository".

## Step 2: Create a React Application

1. Open VSCode.

2. Navigate to the directory where you want to create your project either through CLI or by opening the folder.

3. Use Create React App to set up a new React project:
    ```
    bunx create-react-app <your-project-name>
    ```

## Step 3: Create an Anchor Workspace

1. Within the same directory, run the following command to create an Anchor workspace:
    ```
    anchor init <new-workspace-name>
    ```

## Step 4: Initialize a Git Repository

1. Create a README file:
    ```
    echo "# test" >> README.md
    ```
2. Initialize a new Git repository:

    ```
    git init
    ```

3. Add all files to the staging area:

    ```
    git add .
    ```

4. Commit the changes:

    ```
    git commit -m "first commit"
    ```

5. Rename the default branch to `main`:

    ```
    git branch -M main
    ```

6. Add the remote repository:

    ```
    git remote add origin https://github.com/<GITHUB_USER_NAME>/<REPOSITORY_NAME>.git
    ```

7. Push the changes to the remote repository:
    ```
    git push -u origin main
    ```
