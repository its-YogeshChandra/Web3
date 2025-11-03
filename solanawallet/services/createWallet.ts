import { PublicKey, Keypair } from "@solana/web3.js";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { base58 } from "@scure/base";

export class walletFunction {
  constructor() {}

  createMnemonicAddress() {
    const mn = bip39.generateMnemonic(wordlist, 128);
    const mphrase = mn.split(" ")
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
 
  generatePublickeyfromPrivatekey(privatekey:string){
   const secretKeyBytes = base58.decode(privatekey);
   const keyPair = Keypair.fromSecretKey(secretKeyBytes)
   const publicKey = keyPair.publicKey.toBase58();
   return publicKey;
 }
 
 async generatekeyPairfromMnemonic(mphrase:string){
    const seedPhrase = await this.createSeedPhrase(mphrase);
    const keyPair = Keypair.fromSeed(seedPhrase) 
    //generate public key 
    const publicKey = keyPair.publicKey.toBase58();
    return publicKey
 }
}

const walletServices = new walletFunction();

export { walletServices };
