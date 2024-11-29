import { Connection, PublicKey, Keypair, SystemProgram } from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';
import idl from './idl.json'; // Replace with the path to your IDL file
import { Buffer } from 'buffer';

// Make `Buffer` globally available
window.Buffer = Buffer;
// Program and Network Configuration
const programID = new PublicKey('3VZvETysyu3phEP1CHFq5b7oAkXK4JaYVqNRWcEZaGgV');
const network = 'https://api.devnet.solana.com'; // Change to 'mainnet-beta' for mainnet
const connection = new Connection(network, 'confirmed');

// Provider
const provider = new AnchorProvider(
  connection,
  window.solana, // Phantom wallet
  { preflightCommitment: 'processed' }
);
await window.solana.connect();
const program = new Program(idl, programID, provider);

// Adding a Goal
export const addTask = async (text) => {
  try {
    const goalKeypair = Keypair.generate(); // New account for the goal
    await program.methods.addingTask(text).accounts({
        task: goalKeypair.publicKey,
        author: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      }).signers([goalKeypair]).rpc();

  } catch (error) {
    console.error('Error adding goal:', error);
  }
};

// Updating a Goal
export const updateTask = async (taskPublicKey, isDone) => {
    try {
        await program.methods.updatingTask(isDone).accounts({
            task: taskPublicKey,
            author: provider.wallet.publicKey,
        }).rpc();
    } catch (error) {
        console.error('Error updating goal:', error);
    }
};

// Deleting a Goal
export const deleteTask = async (goalPublicKey) => {
    try{
        await program.methods.deletingTask().accounts({
            task: goalPublicKey,
            author: provider.wallet.publicKey,
        }).rpc();
    } catch (error) {
        console.error('Error deleting goal:', error);
    }
};

// Fetch all goals
export const fetchAllTasks = async () => {
    try {
      const tasks = await connection.getProgramAccounts(programID, {
        filters: [
          {
            memcmp: {
              offset: 8, // Discriminator offset
              bytes: provider.wallet.publicKey.toBase58(), // Filter by author
            },
          },
        ],
      });
  
      const decodedTasks = tasks.map((task) => {
        const accountInfo = program.coder.accounts.decode('Task', task.account.data);
        return {
          pubkey: task.pubkey.toString(),
          ...accountInfo,
        };
      });
  
      console.log('Fetched tasks:', decodedTasks);
      return decodedTasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };