import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";

export class walletfeatures {
  //create features of the wallet

  createeMnemonic() {
    const mn: String = bip39.generateMnemonic(wordlist);
    console.log(mn);
    return mn;
  }

  async createPublicandPrivatekey(mphrase:string) {
    const seed1 = await bip39.mnemonicToSeedWebcrypto(mphrase)
  }
}
const walletFunctions = new walletfeatures();
export { walletFunctions };
