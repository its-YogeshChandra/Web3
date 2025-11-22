import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { base58 } from "@scure/base";


export class swapfunctions {
  private connection;
  constructor(devnetUrl: string,) {
    this.connection = new Connection(devnetUrl)
  }

  //fetch balance function 
  async fetchBalance(publickey: PublicKey) {
    try {
      //call the function on connection
      const lamports = await this.connection.getBalance(publickey)
      const balance = lamports / 1000000000
      return balance
    } catch (error) {
      console.error(error)
    }
  }


  //swap function 
}

const swapServices = new swapfunctions(import.meta.env.VITE_DEVNET_URL);

export { swapServices }
