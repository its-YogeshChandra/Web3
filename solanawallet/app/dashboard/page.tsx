"use client";
import { Button } from "@/components/ui/button";
import solanapng from "../../public/solana.png";
import Image from "next/image";
import { Copy, Divide } from "lucide-react";
import { TextAlignJustify } from "lucide-react";
import { useEffect, useState } from "react";
import { X } from "lucide-react"; import { CirclePlus } from "lucide-react";
import { walletServices } from "@/services/createWallet";
import { base58 } from "@scure/base";

// bg-[#051715]
export default function() {
  const [sideBarOpen, setSidebarOpen] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const setSideBarState = () => {
    setSidebarOpen((prev) => !prev);
  };
  const [solBalance, setSolBalance] = useState(100)
  const [isSending, setisSending] = useState(false)
  const [senderAddress, setSenderAddress] = useState("");
  //fetch the public key
  useEffect(() => {
    const fetcherFunction = async () => {
      const data = await walletServices.generatePublickeyfromPrivatekey();
      if (data) {
        const value = data.toBase58()
        setPublicKey(value);
      }
    };
    fetcherFunction();
  }, []);

  //fetch the solana balance 
  useEffect(() => {
    const fetcherFunction = async () => {
      const data = await walletServices.fetchBalance();
      if (data) {
        setSolBalance(data)
      }
    };
    fetcherFunction();
  }, []);

  //function to airdrop sol
  const airdropSol = async () => {
    await walletServices.airdropSol();
    alert("airdrop successfull")
  }

  //function  to send sol
  const sendSol = async (key: string) => {
    console.log(key)
    const sendsol = await walletServices.sendTransaction(key);
    if (sendsol == "success") {
      alert("successfully send")
    }
  }

  return (

    <div className="w-screen h-screen bg-[#051715] flex flex-col gap-y-2 items-center  p-24 relative ">
      {sideBarOpen == true ? (
        <button
          onClick={() => {
            setSideBarState();
          }}
        >
          <X className="text-white absolute left-6 top-8" />{" "}
        </button>
      ) : (
        <button
          onClick={() => {
            setSideBarState();
          }}
        >
          <TextAlignJustify className="text-white absolute left-6 top-8" />{" "}
        </button>
      )}
      {sideBarOpen == true ? (
        <div className="w-20 h-full absolute top-16 left-0 bg-black flex flex-col items-center pt-4 ">
          <CirclePlus className="text-white w-8 h-8" />
        </div>
      ) : null}
      <p className="text-6xl text-white mb-5">Account 1</p>
      <div className="w-xl h-[100px] bg-yellow-300 flex flex-col justify-center items-center">
        <p className="text-6xl"> {solBalance} </p>
        <p className="text-4xl">SOL</p>
      </div>
      <div className="w-xl h-max p-1 flex justify-center gap-x-2">
        <Button onClick={() => {
          setisSending(prev => !prev)
        }}>Send</Button>
        <Button>Receive</Button>
        <Button onClick={
          () => {
            airdropSol()
          }
        } >Airdrop Sol</Button>
      </div>

      {
        isSending == true ? <div className="w-xl h-max p-1 bg-white flex ">
          <input id="senderAddress" type="text" value={senderAddress} onChange={(e) => setSenderAddress((e.target.value))} className="w-full h-full " />

          <Button onClick={() => {
            sendSol(senderAddress)
          }}> send</Button>
        </div> : null
      }

      <div className="w-xl h-max bg-red-300 p-4 flex gap-x-6 ">
        <Image src={solanapng} alt="" className="w-8 h-8" />
        <p className="text-white mt-1">
          {publicKey || "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH"}
        </p>
      </div>
      <Button className="w-xl h-max">
        <p>Copy Address</p>
        <Copy />
      </Button>
    </div>
  );
}
