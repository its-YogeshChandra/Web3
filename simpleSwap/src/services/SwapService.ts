import { Keypair, Connection } from "@solana/web3.js";
import { base58 } from "@scure/base";

export class swapfunctions {
  private generateKeyPair(privatekey: string): Keypair {
    const neededKey = base58.decode(privatekey)
    const keypair = Keypair.fromSecretKey(neededKey)
    return keypair

  }
  private keyPair
  private connection
  constructor(devnetUrl: string, privateKey: string) {
    this.keyPair = this.generateKeyPair(privateKey)
    this.connection = new Connection(devnetUrl)
  }
  async keychecker() {
    const data = this.keyPair
    return data
  }
}

const swapServices = new swapfunctions();

export { swapServices }
