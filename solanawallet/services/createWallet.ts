import { PublicKey, Keypair, Connection } from "@solana/web3.js";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { base58 } from "@scure/base";
import { pbkdf2 } from "crypto";

const values = {
  password: "",
};

export class walletFunction {
  constructor() {}

  createMnemonicAddress() {
    const mn = bip39.generateMnemonic(wordlist, 128);
    const mphrase = mn.split(" ");
    return mphrase;
  }

  private async createSeedPhrase(mphrase: string) {
    const seedPhrase = await bip39.mnemonicToSeed(mphrase);
    //return the seedphrase
    return seedPhrase;
  }

  private async generatePublicandPrivatekey(seed: Uint8Array) {
    const keyPair = Keypair.fromSeed(seed);
    const privateKey = keyPair.secretKey;
    const publicKey = keyPair.publicKey.toBase58();
    return { privateKey, publicKey };
  }

  generatePublickeyfromPrivatekey(privatekey: string) {
    const secretKeyBytes = base58.decode(privatekey);
    const keyPair = Keypair.fromSecretKey(secretKeyBytes);
    const publicKey = keyPair.publicKey.toBase58();
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
      process.env.NEXT_PUBLIC_DEVNET_URL ||
        "https://solana-devnet.g.alchemy.com/v2/E4GYCRN489SZHhZeEHdSE"
    );

    // const accountInfo = await connection.getAccountInfo();
    // console.log(JSON.stringify(accountInfo, null, 2));
  }

  //function to derive encryption key , an implemenation of the symmetric encryption
  private async deriveencryptionKey(password: string) {
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
    const deriveKey = window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
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
    const keyPair = Keypair.fromSeed(seedPhrase);

    //save the key in storage
    localStorage.setItem("password", password);

    //encryption mechanism
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await this.deriveencryptionKey(password);
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

    if (localStorage.geItem("solana_encrypted_key") !== "") {
      //add send the success message
      return "success";
    }
  }

  //function to decrypt data
  async decryptData() {
    //bring the obj from the localstorage
    const { cipher, salt, iv } = JSON.parse(
      localStorage.getItem("solana_encrypted_key") || "gibershmarco"
    );

    // Convert stored arrays back into Uint8Arrays
    const cipherArray = new Uint8Array(cipher);
    const saltArray = new Uint8Array(salt);
    const ivArray = new Uint8Array(iv);

    //fetch the password from the storage
    const password =
      localStorage.getItem("password") ||
      "9b8f4aee10baf3ef84e2973cf03d5851e24467352b519e0c9db174c69e0a7cc8";

    //create the derive key using the password
    const derivedKey = await this.deriveencryptionKey(password);

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

const walletServices = new walletFunction();

export { walletServices };
