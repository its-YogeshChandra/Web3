import {
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  PublicKey,
} from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  createAssociatedTokenAccountInstruction,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createMintToInstruction,
} from "@solana/spl-token";

const devnetUrl =
  "https://solana-devnet.g.alchemy.com/v2/E4GYCRN489SZHhZeEHdSE";
console.log(`devnet url: ${devnetUrl}`);
const connection = new Connection(devnetUrl);
const latestBlockhash = await connection.getLatestBlockhash();

//create new keypair
const keyPair = Keypair.generate();

//create new public key
const publickey = keyPair.publicKey;

//airdrop some sol into the account
console.log(`publickey: ${publickey}`);
const airdropSol = await connection.requestAirdrop(
  new PublicKey(publickey),
  LAMPORTS_PER_SOL
);

const transactionConfirmed = await connection.confirmTransaction({
  blockhash: latestBlockhash.blockhash,
  lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  signature: airdropSol,
});

if (typeof transactionConfirmed.context.slot == "number") {
  //generate address to be used as mint address
  const mint = Keypair.generate();

  const createAccountInstruction = SystemProgram.createAccount({
    fromPubkey: publickey,
    newAccountPubkey: mint.publicKey,
    space: MINT_SIZE,
    lamports: await getMinimumBalanceForRentExemptMint(connection),
    programId: TOKEN_PROGRAM_ID,
  });

  //creating instruction for mint
  const initializeMintInstruction = createInitializeMintInstruction(
    mint.publicKey,
    9,
    publickey, //mint authority
    publickey, //freeze authority
    TOKEN_PROGRAM_ID
  );

  //createing associated token account
  const associatedTokenAccount = getAssociatedTokenAddressSync(
    mint.publicKey,
    publickey,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  const createAssociatedTokenAccountIx =
    createAssociatedTokenAccountInstruction(
      publickey, // payer
      associatedTokenAccount, // associated token account address
      publickey, // owner
      mint.publicKey, // mint
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

  const transaction = new Transaction({
    feePayer: publickey,
    blockhash: latestBlockhash.blockhash,
    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  }).add(
    createAccountInstruction,
    initializeMintInstruction,
    createAssociatedTokenAccountIx
  );

  const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [keyPair, mint]
  );

  console.log("Mint Address:", mint.publicKey.toBase58());
  console.log(
    "Associated Token Account Address:",
    associatedTokenAccount.toBase58()
  );
  console.log("Transaction Signature:", transactionSignature);

  if (transactionSignature) {
    //create transaction for minting tokens
    const mintAmount = 100;

    const mintToInstruction = createMintToInstruction(
      mint.publicKey,
      associatedTokenAccount,
      publickey,
      mintAmount,
      [],
      TOKEN_PROGRAM_ID
    );

    const mintBlockhash = await connection.getLatestBlockhash();

    //create and sign transaction for minting tokens
    const mintTransaction = new Transaction({
      feePayer: publickey,
      blockhash: mintBlockhash.blockhash,
      lastValidBlockHeight: mintBlockhash.lastValidBlockHeight,
    }).add(mintToInstruction);

    //sign and send mint Transaction
    const mintTransactionSignature = await sendAndConfirmTransaction(
      connection,
      mintTransaction,
      [keyPair]
    );
    console.log("Successfully minted 1.0 tokens");
    console.log("Transaction Signature:", mintTransactionSignature);
  }
}
