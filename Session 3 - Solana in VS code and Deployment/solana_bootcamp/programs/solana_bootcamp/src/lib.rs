//all import statements
use anchor_lang::prelude::*;

// Rust Macro
declare_id!("7g8ZaQ4nCf3VyVAaXxjr8uzvg4r1y8Adu2nzL9mGM6p4");

#[program]
pub mod solana_bootcamp {
    use super::*;

    // Initialize function / constructor
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {

        //declare everything you need inside here to run the program

        Ok(()) // showing the code is running ok, 200 HTTP status code
    }

    //other functions
}

// type declaration
#[derive(Accounts)]
pub struct Initialize {}
