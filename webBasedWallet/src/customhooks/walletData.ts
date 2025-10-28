import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { Wallet,HDNodeWallet } from "ethers";

export class walletfeatures {
  //create features of the wallet
  private async createSeed (mphrase:string){
     const seed = await bip39.mnemonicToSeedWebcrypto(mphrase) 
    return seed;
  }
  createeMnemonic() {
    const mn: string = bip39.generateMnemonic(wordlist);
    console.log(mn);
    return mn;
  }

  async createPublicandPrivatekey(mphrase: string) {
    const seed = await this.createSeed(mphrase);
    const keypair = Keypair.fromSeed(seed);

    //create private and public key
    const publickey:string = keypair.publicKey.toString();
    const privateKey = keypair.secretKey;

    //return the public and private key
    return {
      publickey,
      privateKey,
    };
  }

   async createEthAddress(index: number, mphrase: string){
  //needs derivation path
   const path = `m/44'/60'/${index}'/0`
   const seed = await this.createSeed(mphrase)
   const hdNode = HDNodeWallet.fromSeed(seed)
   const child = hdNode.derivePath(path)
   //create private key 
   const privatekey = child.privateKey;
   const wallet = new Wallet(privatekey);
   const walletAdress = wallet.address
   //return wallet address
   return walletAdress;
  }

  //create sol addresss
  createsolAddress(index: number, mphrase: string){
    const seed = await this.createSeed(mphrase)
  }
}
const walletFunctions = new walletfeatures();
export { walletFunctions };
