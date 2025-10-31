import {
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  PublicKey
} from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint
} from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"));
 const latestBlockhash = await connection.getLatestBlockhash();


//create new keypair 
const keyPair = Keypair.generate();

//create new public key 
const publickey = keyPair.publicKey;

//airdrop some sol into the account
const airdropSol = await connection.requestAirdrop(publickey, LAMPORTS_PER_SOL);

const transactionConfirmed = await connection.confirmTransaction({  blockhash: latestBlockhash.blockhash,
  lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  signature: airdropSol});

  if (typeof(transactionConfirmed.context.slot) == "number" ){
  //generate address to be used as mint address
  const mint = Keypair.generate();

  const createAccountInstruction = SystemProgram.createAccount({
    
  })
  }