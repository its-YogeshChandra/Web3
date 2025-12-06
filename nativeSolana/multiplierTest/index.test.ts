import * as borsh from "borsh";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import { expect, jest, test } from "bun:test"

//schema for the accoun type
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
    'input': { array: { type: 'i32', len: 2 } },
    'result': 'i32'
  }
}

const multipliersize = borsh.serialize(schema, new MultiplierAccount({ input: [0, 0] }, { result: 0 })).length;


//schmea for insturction 
class Number {
  value: Uint8Array;
  constructor({ value }: { value: Uint8Array }) {
    this.value = value;
  }
}

//corresponding enum schema for Instruction
const instructionSchema: borsh.Schema = {
  enum: [{
    struct: {
      value: {
        array: { type: "u8", len: 2 }
      }
    }
  }]
}




let multiplierAccountKeypair: Keypair;
let adminKeyPair: Keypair;

const connection = new Connection('http://127.0.0.1:8899')

test("multiplication is working", async () => {
  adminKeyPair = Keypair.generate();
  multiplierAccountKeypair = Keypair.generate()


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

  //crate the account data and ensure it's empty 
  const multiplieraccountinfo = await connection.getAccountInfo(multiplierAccountKeypair.publicKey);
  if (!multiplieraccountinfo || multiplieraccountinfo == undefined) {
    throw new Error("account not found")
  }

  const mult = borsh.deserialize(schema, multiplieraccountinfo.data);
  console.log(mult);
})


test("multiplication happens", async () => {

  // test for the multiplier 
  const tx = new Transaction();
  const programid = new PublicKey("F2YrQcv6mXP46GYBrdJmZr82mHZdo36dnqbWRfCCMcT8");

  const insturctionData = Buffer.from(
    borsh.serialize(instructionSchema, new Number({ value: new Uint8Array([4, 9]) }))
  )
  tx.add(new TransactionInstruction({
    keys: [{
      pubkey: multiplierAccountKeypair.publicKey,
      isSigner: false,
      isWritable: true,
    }],
    programId: programid,
    data: insturctionData
  }))

  //send and confirm the tranasaction 
  const txhash = await sendAndConfirmTransaction(connection, tx, [adminKeyPair]);
  if (!txhash) {
    throw new Error("multiplier not working fine");
  }
  console.log("transaction hash :" + txhash);

  //fetch the account info from the blockchain
  const multaccountinfo = await connection.getAccountInfo(multiplierAccountKeypair.publicKey);
  if (!multaccountinfo) {
    throw new Error("account not found")
  };

  const mult = borsh.deserialize(schema, multaccountinfo.data,) as MultiplierAccount;
  console.log(mult);
})
