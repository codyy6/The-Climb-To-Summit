# Rust Programming Language Tutorial
## Introduction

Rust is a systems programming language focused on safety, speed, and concurrency. It achieves memory safety without a garbage collector, making it a great choice for performance-critical applications.

## Basic Concepts

1. #[program]

```
#[program]
pub mod todo_list_app {
    // program logic
}
```
Purpose: This defines the main Solana program (or smart contract). Inside this module, the program functions that handle specific instructions (like adding, updating, and deleting tasks) are defined.

Anchor’s Role: Anchor uses this macro to group together all the program’s functions and make them callable by the Solana runtime. It handles the boilerplate code needed for Solana programs.

2. Context Structs
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
#[derive(Accounts)]: This macro auto-generates code that helps Anchor validate accounts passed into your instruction. It ensures that all account-related logic (like initialization, mutations, and relationships) is handled correctly.

Account Constraints: The fields in the struct represent the accounts required to execute the instruction. For example:
 - #[account(init, payer = author, space = Task::LEN)]: Initializes a new Task account, sets the payer (who pays for storage fees) to the author, and allocates space based on the length of the Task struct.
 - #[account(mut)]: Marks the author account as mutable, meaning it will be modified in this instruction (e.g., paying for the transaction).
Signer<'info>: Specifies that the author must sign the transaction.

Context<T>: The ctx parameter in your program functions is of type Context<T>, where T refers to the specific account struct (e.g., AddingTask, UpdatingTask). This struct encapsulates the required accounts and other data necessary for the function.

3. Account Struct
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
#[account]: This macro marks the struct as a data structure that will be stored in a Solana account. Anchor will automatically handle serialization and deserialization of this data to and from the account's data field.

Field Types:
 - Pubkey: Represents the public key of the account that created the task.
 - bool: A boolean field for marking if a task is done.
 - String: Text data representing the task description.
 - i64: Stores timestamps for created_at and updated_at as 64-bit integers.

4. Account Size Calculation
```
const DISCRIMINATOR: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const BOOL_LENGTH: usize = 1;
const TEXT_LENGTH: usize = 4 + 400 * 4; // 400 chars
const TIMESTAMP_LENGTH: usize = 8;

impl Task {
    const LEN: usize = DISCRIMINATOR + // discriminator
        PUBLIC_KEY_LENGTH + // author
        BOOL_LENGTH + // is_done
        TEXT_LENGTH +  // text
        TIMESTAMP_LENGTH + // created_at
        TIMESTAMP_LENGTH; // updated_at
}
```
Why calculate length?: Solana accounts have a fixed size, so you need to specify how much space to allocate for storing your data. This code calculates the total size of the Task account, including each field’s size.

Discriminator: Anchor prepends an 8-byte discriminator to all accounts to identify them as belonging to a specific program or struct.
Example: The discriminator helps differentiate between various account types in a single program.

Size Breakdown:
Pubkey (32 bytes), bool (1 byte), String (4 + 400 * 4 bytes), and i64 (8 bytes) make up the rest of the account size.

5. Error Handling with #[error_code] Enum
```
#[error_code]
pub enum ErrorCode {
    #[msg("The text is too long")]
    TextTooLong,
}
```
#[error_code]: This macro is used to define custom errors that your smart contract can return. In this case, the contract checks if the task description exceeds 400 characters and returns an error if it does.

Error Enum: The enum ErrorCode represents the possible errors that can occur in the smart contract. The #[msg] attribute allows you to define human-readable error messages.

6. Result Type and Error Handling
```
pub fn adding_task(ctx: Context<AddingTask>, text: String) -> Result<()> {
    if text.chars().count() > 400 {
        return Err(ErrorCode::TextTooLong.into());
    }
    // logic for adding task
    Ok(())
}
```
Result Type: Smart contract functions return Result<()>, which means they either return Ok(()) on success or an Err on failure.

Error Handling: You use the Err(ErrorCode::TextTooLong.into()) pattern to return a custom error (defined in the ErrorCode enum) when the task description is too long.

The Ok(()): It signifies the function executed successfully.

7. Signer Validation
```
pub struct UpdatingTask<'info> {
    #[account(mut, has_one = author)]
    pub task: Account<'info, Task>,
    pub author: Signer<'info>,
}
```
has_one = author: This constraint ensures that the author account provided to the transaction matches the author stored in the task account. This prevents unauthorized users from modifying tasks they don't own.

Signer<'info>: The author account must be a signer of the transaction, meaning they must provide a cryptographic signature proving their authority to perform the operation.

8. Mutability of Accounts
```
#[account(mut)]
pub task: Account<'info, Task>,
```
#[account(mut)]: This keyword indicates that the account will be modified. Without this, the program will treat the account as read-only and will not allow updates to its data.

9. Program ID Declaration
```
declare_id!("5sLam5uVHATWPMhhhXrR1i2adxwE5GnLUMhEbreBEa7g");
```
declare_id!: This macro declares the public key of the program. It identifies your program on the Solana blockchain and links your code to a specific on-chain program address.