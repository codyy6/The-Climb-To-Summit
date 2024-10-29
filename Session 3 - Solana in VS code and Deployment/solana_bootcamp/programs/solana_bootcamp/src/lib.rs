use anchor_lang::prelude::*;

declare_id!("5sLam5uVHATWPMhhhXrR1i2adxwE5GnLUMhEbreBEa7g");

#[program]
pub mod goal_list_app {
    use super::*;

    pub fn adding_goal(
        ctx: Context<AddingGoal>,
        text: String,
        year: u64,
        month: u64,
    ) -> Result<()> {
        let goal = &mut ctx.accounts.goal;
        let author = &ctx.accounts.author; // The `author` account
        let clock = Clock::get().unwrap(); // Getting the current timestamp

        // Ensure text length constraint
        if text.chars().count() > 400 {
            return Err(ErrorCode::TextTooLong.into());
        }

        // Set goal data
        goal.author = *author.key;
        goal.is_done = false;
        goal.created_at = clock.unix_timestamp;
        goal.updated_at = clock.unix_timestamp;
        goal.text = text;
        goal.year = year;
        goal.month = month;

        Ok(())
    }

    pub fn updating_goal(ctx: Context<UpdatingGoal>, is_done: bool) -> Result<()> {
        let goal = &mut ctx.accounts.goal;
        let author = &ctx.accounts.author; // The `author` account
        let clock = Clock::get().unwrap(); // Getting the current timestamp

        // Update goal status
        goal.author = *author.key;
        goal.is_done = is_done;
        goal.updated_at = clock.unix_timestamp;

        Ok(())
    }

    pub fn deleting_goal(ctx: Context<DeletingGoal>) -> Result<()> {
        let goal = &mut ctx.accounts.goal;
        let author = &ctx.accounts.author; // The `author` account
        let clock = Clock::get().unwrap(); // Getting the current timestamp

        // Mark goal as done
        goal.author = *author.key;
        goal.is_done = true;
        goal.updated_at = clock.unix_timestamp;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct AddingGoal<'info> {
    #[account(init, payer = author, space = Goal::LEN)]
    pub goal: Account<'info, Goal>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdatingGoal<'info> {
    #[account(mut, has_one = author)]
    pub goal: Account<'info, Goal>,
    pub author: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeletingGoal<'info> {
    #[account(mut, has_one = author)]
    pub goal: Account<'info, Goal>,
    pub author: Signer<'info>,
}

#[account]
pub struct Goal {
    pub author: Pubkey,  // The account that owns the goal
    pub is_done: bool,   // Whether the goal is completed or not
    pub text: String,    // The description of the goal
    pub year: u64,       // Target year for completion
    pub month: u64,      // Target month for completion
    pub created_at: i64, // Timestamp of goal creation
    pub updated_at: i64, // Timestamp of last update
}

const DISCRIMINATOR: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const BOOL_LENGTH: usize = 1;
const TEXT_LENGTH: usize = 4 + 400 * 4; // 400 chars max
const YEAR_LENGTH: usize = 8; // u64 for year
const MONTH_LENGTH: usize = 8; // u64 for month
const TIMESTAMP_LENGTH: usize = 8;

impl Goal {
    const LEN: usize = DISCRIMINATOR + // discriminator
        PUBLIC_KEY_LENGTH + // author
        BOOL_LENGTH +       // is_done
        TEXT_LENGTH +       // text
        YEAR_LENGTH +       // year
        MONTH_LENGTH +      // month
        TIMESTAMP_LENGTH +  // created_at
        TIMESTAMP_LENGTH; // updated_at
}

#[error_code]
pub enum ErrorCode {
    #[msg("The text is too long")]
    TextTooLong,
}
