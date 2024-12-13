# Step 1: Visit the Solana Playground Website:

Open your web browser and go to Solana Playground (https://beta.solpg.io/).

# Step 2: Create a New Project:

Click on "Create New Project" to start a new Solana project. You can choose from various templates or start from scratch.
In this session, select Anchor(Rust) and input ur project name.

## Step 3: Write Your Code:

1. **Import the necessary modules:**

    ```rs
    use anchor_lang::prelude::*;
    ```

2. **Declare the program ID:**

    ```rs
    //Previous code above

    declare_id!("");
    ```

3. **Define the main program module:**

    ```rs
    //Previous code above

    #[program]
    pub mod todo_list_app {
        use super::*;

        //Input your program functionalities here
    }

    //Input your Context, Struct/Class type and error messages here
    ```

4. **Define the Task account Class:**

    ```rs
    //Previous code above

    #[account]
    pub struct Task {
        pub author: Pubkey,
        pub is_done: bool,
        pub text: String,
        pub created_at: i64,
        pub updated_at: i64,
    }
    ```

5. **Define the Task account size:**

    ```rs
    //Previous code above

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

6. **Define custom error codes:**

    ```rs
    //Previous code above

    #[error_code]
    pub enum ErrorCode {
         #[msg("The text is too long")]
         TextTooLong,
    }
    ```

7. **Define the context for adding a task:**

    ```rs

    #[derive(Accounts)]
    pub struct AddingTask<'info> {
       // This is an attribute macro that provides metadata to the Rust compiler about how to handle the associated account.
       //init: This keyword indicates that the account should be initialized. When the instruction is executed, a new account will be created on the Solana blockchain.

      //payer = author: This specifies that the author account will be responsible for paying the rent (a fee required to keep the account alive on the blockchain) and the transaction fees associated with creating the new account.

      //space = Task::LEN: This defines the amount of space to allocate for the new account. Task::LEN is a constant that represents the size, in bytes, required to store the Task struct. This ensures that the account has enough space to store all the necessary data.
         #[account(init, payer = author, space = Task::LEN)]
         pub task: Account<'info, Task>,

         //#[account(mut)]: Indicates that my_account is a mutable account, allowing its data to be modified.

         #[account(mut)]
         pub author: Signer<'info>,

         //Type (Program<'info, System>): The type of this field is Program<'info, System>. This is a generic type provided by the Anchor framework, which is a popular framework for developing Solana programs. The Program type is a wrapper that ensures the account is a valid program account. The 'info lifetime parameter indicates that this reference is tied to the lifetime of the account info, ensuring memory safety. The System type parameter specifies that this particular program is the System Program.
         pub system_program: Program<'info, System>,
    }
    ```

8. **Add the function to create a new task:**

    ```rs
          pub fn adding_task(ctx: Context<AddingTask>, text: String) -> Result<()> {

            //In Rust, &mut is used to create a mutable reference to a value. This means that you can modify the value through this reference.
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

9. **Define the context for updating a task:**

    ```
    Try to do the code yourself based on the example above.
    ```

10. **Define the context for deleting a task:**

    ```
    Try to do the code yourself based on the example above.
    ```

11. **Add the function to update an existing task:**

    ```
         Try to do the code yourself based on the example above.
    ```

12. **Add the function to delete a task:**

    ```
         Try to do the code yourself based on the example above.
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
```
