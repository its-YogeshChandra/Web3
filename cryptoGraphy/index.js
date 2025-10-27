import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

const keypairGen = () => {
  //generate keypair
  const key = Keypair.generate();

  const publickey = key.publicKey;
  const privatekey = key.secretKey;

  return {
    publickey,
    privatekey,
  };
};

const signtheArray = () => {
  const { publickey, privatekey } = keypairGen();
  console.log(`publickey: ${publickey.toString()}`);
  console.log(`privatekey: ${privatekey}`);

  const message = "hello world";
  const encodedMessage = new TextEncoder().encode(message);
  
  //creating the signature
  const signature = nacl.sign.detached(encodedMessage, privatekey);

  const result = nacl.sign.detached.verify(
    encodedMessage,
    signature,
    publickey.toBytes()
  );

  console.log(result);
};

signtheArray();

