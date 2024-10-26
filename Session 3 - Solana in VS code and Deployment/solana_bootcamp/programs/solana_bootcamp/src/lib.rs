use anchor_lang::prelude::*;

declare_id!("7g8ZaQ4nCf3VyVAaXxjr8uzvg4r1y8Adu2nzL9mGM6p4");

#[program]
pub mod solana_bootcamp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
