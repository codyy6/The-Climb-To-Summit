# Step 1: Visit the Solana Playground Website:
Open your web browser and go to Solana Playground (https://beta.solpg.io/).

# Step 2: Create a New Project:
Click on "Create New Project" to start a new Solana project. You can choose from various templates or start from scratch.
In this session, select Anchor(Rust) and input ur project name.

## Step 3: Write Your Code:

1. **Import the necessary modules:**
    ```
    use anchor_lang::prelude::*;
    ```

2. **Declare the program ID:**

    ```
    declare_id!("");
    ```

3. **Define the main program module:**
    ```
    #[program]
    pub mod todo_list_app {
         use super::*;
    ```

4. **Add the function to create a new task:**
    ```
         pub fn adding_task(ctx: Context<AddingTask>, text: String) -> Result<()> {
              let task = &mut ctx.accounts.task;
              let author = &ctx.accounts.author;
              let clock = Clock::get().unwrap();
              
              if text.chars().count() > 400 {
                    return Err(ErrorCode::TextTooLong.into());
              }
              
              task.author = *author.key;
              task.is_done = false;
              task.created_at = clock.unix_timestamp;
              task.updated_at = clock.unix_timestamp;
              task.text = text;
              Ok(())
         }
    ```

5. **Add the function to update an existing task:**
    ```
         pub fn updating_task(ctx: Context<UpdatingTask>, is_done: bool) -> Result<()> {
              let task = &mut ctx.accounts.task;
              let author = &ctx.accounts.author;
              let clock = Clock::get().unwrap();
              
              task.author = *author.key;
              task.is_done = is_done;
              task.updated_at = clock.unix_timestamp;
              Ok(())
         }
    ```

6. **Add the function to delete a task:**
    ```
         pub fn deleting_task(ctx: Context<DeletingTask>) -> Result<()> {
              let task = &mut ctx.accounts.task;
              let author = &ctx.accounts.author;
              let clock = Clock::get().unwrap();
              
              task.author = *author.key;
              task.is_done = true;
              task.updated_at = clock.unix_timestamp;
              Ok(())
         }
    }
    ```

7. **Define the context for adding a task:**
    ```
    #[derive(Accounts)]
    pub struct AddingTask<'info> {
         #[account(init, payer = author, space = Task::LEN)]
         pub task: Account<'info, Task>,
         #[account(mut)]
         pub author: Signer<'info>,
         pub system_program: Program<'info, System>,
    }
    ```

8. **Define the context for updating a task:**
    ```
    #[derive(Accounts)]
    pub struct UpdatingTask<'info> {
         #[account(mut, has_one = author)]
         pub task: Account<'info, Task>,
         pub author: Signer<'info>,
    }
    ```

9. **Define the context for deleting a task:**
    ```
    #[derive(Accounts)]
    pub struct DeletingTask<'info> {
         #[account(mut, has_one = author)]
         pub task: Account<'info, Task>,
         pub author: Signer<'info>,
    }
    ```

10. **Define the Task account structure:**
     ```
     #[account]
     pub struct Task {
          pub author: Pubkey,
          pub is_done: bool,
          pub text: String,
          pub created_at: i64,
          pub updated_at: i64,
     }
     ```

11. **Define the Task account size:**
     ```
     const DISCRIMINATOR: usize = 8;
     const PUBLIC_KEY_LENGTH: usize = 32;
     const BOOL_LENGTH: usize = 1;
     const TEXT_LENGTH: usize = 4 + 400 * 4;
     const TIMESTAMP_LENGTH: usize = 8;

     impl Task {
          const LEN: usize = DISCRIMINATOR +
                PUBLIC_KEY_LENGTH +
                BOOL_LENGTH +
                TEXT_LENGTH +
                TIMESTAMP_LENGTH +
                TIMESTAMP_LENGTH;
     }
     ```

12. **Define custom error codes:**
     ```
     #[error_code]
     pub enum ErrorCode {
          #[msg("The text is too long")]
          TextTooLong,
     }
     ```
```

Compile Your Code:

Click on the "Build" button to compile your code. The playground will show any compilation errors and warnings.
Deploy Your Program:

Once your code is compiled successfully, you can deploy it to the Solana blockchain. Click on the "Deploy" button and follow the instructions.
Interact with Your Program:

After deployment, you can interact with your smart contract using the provided interface. You can send transactions, call functions, and view the state of your program.
Debug and Test:

Use the debugging tools provided by Solana Playground to test and debug your smart contract. You can set breakpoints, inspect variables, and step through your code.
Save and Share:

Save your project and share it with others using the provided link. Solana Playground allows you to collaborate with other developers easily.