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


  //function to airdrop sol
  const airdropSol = async () => {
    await walletServices.airdropSol();
    alert("airdrop successfull")
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
        <p className="text-6xl">100</p>
        <p className="text-4xl">SOL</p>
      </div>
      <div className="w-xl h-max p-1 flex justify-center gap-x-2">
        <Button>Send</Button>
        <Button>Receive</Button>
        <Button onClick={
          () => {
            airdropSol()
          }
        } >Airdrop Sol</Button>
      </div>
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
