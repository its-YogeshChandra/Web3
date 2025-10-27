import solana from "@solana/web3.js";
const genratorfunc = async () => {
  //generate the key
  const keys = new solana.Keypair();
  console.log("keys:" + keys);
};

genratorfunc();
