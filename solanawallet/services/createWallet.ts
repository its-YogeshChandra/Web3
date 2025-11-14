import { PublicKey, Keypair, Connection, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { base58 } from "@scure/base";
import { pbkdf2 } from "crypto";

export class walletFunction {
  private walletUrl;
  private connection;
  constructor(walletUrl: string) {
    this.walletUrl = walletUrl;
    this.connection = new Connection(this.walletUrl);
  }

  createMnemonicAddress() {
    const mn = bip39.generateMnemonic(wordlist, 128);
    const mphrase = mn.split(" ");
    return mphrase;
  }

  //function to create seedPhrase 
  private async createSeedPhrase(mphrase: string) {
    const seedPhrase = await bip39.mnemonicToSeedWebcrypto(mphrase);
    const Uint32seedPhrase = new Uint8Array(seedPhrase);
    //return the seedphrase
    return Uint32seedPhrase;
  }

  private async generatePublicandPrivatekey(seed: Uint8Array) {
    const keyPair = Keypair.fromSeed(seed);
    const privateKey = keyPair.secretKey;
    const publicKey = keyPair.publicKey.toBase58();
    return { privateKey, publicKey };
  }

  //generate public key from privateKey
  async generatePublickeyfromPrivatekey() {
    //bring the decryption function
    const data = await this.decryptData();
    const keyPair = Keypair.fromSecretKey(data);
    const publicKey = keyPair.publicKey;
    return publicKey;
  }

  async generatekeyPairfromMnemonic(mphrase: string) {
    const seedPhrase = await this.createSeedPhrase(mphrase);
    const keyPair = Keypair.fromSeed(seedPhrase);
    //generate public key
    const publicKey = keyPair.publicKey.toBase58();
    return publicKey;
  }

  async walletBalance(phrase: string) {
    //create connection and query the node for account information
    const connection = new Connection(
      "https://solana-devnet.g.alchemy.com/v2/E4GYCRN489SZHhZeEHdSE"
    );

    // const accountInfo = await connection.getAccountInfo();
    // console.log(JSON.stringify(accountInfo, null, 2));
  }

  //function to airdop sol in the wallet
  async airdropSol() {
    //call the airdrop sol button
    try {
      const publickey = await this.generatePublickeyfromPrivatekey()
      const airdropSignature = await this.connection.requestAirdrop(publickey, LAMPORTS_PER_SOL)
      if (airdropSignature) {
        return {
          success: true
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  //function to fetch balance 
  async fetchBalance() {
    //fetch sol balance from devnet
    try {
      const publickey = await this.generatePublickeyfromPrivatekey()
      const balance = await this.connection.getBalance(publickey)
      return balance / 1000000000
    } catch (error) {
      console.error(error)
    }
  }

  //function to send transaction 
  async sendTransaction(receiverPublicKey: string) {
    //getting blockhash
    try {
      const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash();

      // fetch the public key 
      const publickey = await this.generatePublickeyfromPrivatekey();
      const receiverkey = new PublicKey(receiverPublicKey);
      //create transfer instruction 
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: publickey,
        toPubkey: receiverkey,
        lamports: 0.1 * LAMPORTS_PER_SOL
      })

      //signing the transaction 
      const transaction = new Transaction({
        blockhash,
        lastValidBlockHeight,
        feePayer: publickey
      }).add(transferInstruction);

      //get the keypair from private key 
      const privatekey = await this.decryptData()
      const keyPair = Keypair.fromSecretKey(privatekey)

      const signature = await this.connection.sendTransaction(transaction, [keyPair]);

      if (signature)
        return "success"

    } catch (error) {
      console.log(error)
      return error
    }
  }

  //function to derive encryption key , an implemenation of the symmetric encryption
  private async deriveencryptionKey(password: string, salt: Uint8Array) {
    //make true uint8array salt
    const saltValue = new Uint8Array(salt);

    //const creating the key using password key
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      {
        name: "PBKDF2",
      },
      false,
      ["deriveKey"]
    );
    const deriveKey = crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: saltValue,
        iterations: 25000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    //return the value
    return deriveKey;
  }

  // function to encrypt the private key
  async encryptData(mphrase: string, password: string) {
    //create the seed from the mphrase
    const seedPhrase = await this.createSeedPhrase(mphrase);
    const keyPair = Keypair.fromSeed(seedPhrase.subarray(0, 32));

    //encryption mechanism
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await this.deriveencryptionKey(password, salt);
    //cause key from solana is of type Uint8Array<ArrayBufferLike>
    const secretkey = new Uint8Array(keyPair.secretKey);
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      secretkey
    );

    // create encryptedObj as raw encrypted data can't be stored in local
    const encryptedObj = {
      cipher: Array.from(new Uint8Array(encrypted)),
      salt: Array.from(salt),
      iv: Array.from(iv),
    };

    //save the data in the storage
    localStorage.setItem("solana_encrypted_key", JSON.stringify(encryptedObj));

    if (localStorage.getItem("solana_encrypted_key") !== "") {
      //add send the success message
      return "success";
    }
  }

  //function to decrypt data c
  async decryptData() {
    //bring the obj from the localstorage
    const { cipher, salt, iv } = JSON.parse(
      localStorage.getItem("solana_encrypted_key") || "gibershmarco"
    );

    // Convert stored arrays back into Uint8Arrays
    const cipherArray = new Uint8Array(cipher);
    const ivArray = new Uint8Array(iv);

    //fetch the password from the storage
    const password =
      localStorage.getItem("password") ||
      "9b8f4aee10baf3ef84e2973cf03d5851e24467352b519e0c9db174c69e0a7cc8";

    //create the derive key using the password
    const derivedKey = await this.deriveencryptionKey(password, salt);
    //"https://solana-devnet.g.alchemy.com/v2/E4GYCRN489SZHhZeEHdSE"

    //decrypt the daata using the derived key
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivArray,
      },
      derivedKey,
      cipherArray
    );

    //conver the buffer into the true usable form
    const privateKey = new Uint8Array(decryptedBuffer);
    return privateKey;
  }
}

const walletServices = new walletFunction(
  "https://api.devnet.solana.com"
);

export { walletServices };
