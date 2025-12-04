import * as borsh from "borsh";
import { Connection, Keypair, PublicKey, sendAndConfirmRawTransaction, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { expect, test } from "bun:test"

class MultiplierAccount {
  input: [number, number];
  result: number;

  constructor({ input }: { input: [number, number] }, { result }: { result: number }) {
    this.input = input;
    this.result = result
  }

}


const schema: borsh.Schema = {
  struct: {
    'input': { array: { type: 'i32' } },
    'result': 'i32'
  }
}

const multipliersize = borsh.serialize(schema, new MultiplierAccount({ input: [4, 9] }, { result: 0 })).length;

let multiplierAccountKeypair: Keypair;
let adminKeyPair: Keypair;

test("multiplication is working", async () => {
  adminKeyPair = Keypair.generate();
  multiplierAccountKeypair = Keypair.generate()

  const connection = new Connection('http://127.0.0.1:8899')
  const latestBlockhash = await connection.getLatestBlockhash();
  console.log(await connection.getAccountInfo(adminKeyPair.publicKey));

  //put the solana 
  const tx = await connection.requestAirdrop(adminKeyPair.publicKey, 100 * 1000000000);
  await connection.confirmTransaction({ blockhash: latestBlockhash.blockhash, lastValidBlockHeight: latestBlockhash.lastValidBlockHeight, signature: tx })

  //check for the balance
  const programid = new PublicKey("F2YrQcv6mXP46GYBrdJmZr82mHZdo36dnqbWRfCCMcT8")
  const lamports = await connection.getMinimumBalanceForRentExemption(multipliersize)


  //create multiplier account 
  const createMultiplierAccount = SystemProgram.createAccount({
    fromPubkey: adminKeyPair.publicKey,
    lamports,
    newAccountPubkey: multiplierAccountKeypair.publicKey,
    programId: programid,
    space: multipliersize
  })

  const transaction = new Transaction();
  transaction.add(createMultiplierAccount);

  const txhash = await sendAndConfirmTransaction(connection, transaction, [adminKeyPair, multiplierAccountKeypair]);
  console.log("transaction signature : " + txhash)
})


