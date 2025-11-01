import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 min-h-screen items-center justify-center font-sans dark:bg-black bg-black">
    <p className="text-white text-5xl ">WELCOME TO SOLANA WALLET</p> 
    <Button className="p-4">Create Wallet</Button>
    </div>
  );
}
