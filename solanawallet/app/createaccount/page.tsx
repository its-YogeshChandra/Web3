"use client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function SeedPhrase() {
  const seedArr = Array.from({ length: 12 }, (_, i) => i + 1);
  const [iscreateAccount, setIsCreateAccount] = useState(false);

  //function to setcreate account status
  const setcreateAccountStatus = () => {
    setIsCreateAccount((prev) => !prev);
  };
  return (
    <div className="bg-[#051715] w-screen h-screen flex flex-col gap-y-3 items-center justify-center">
      <Button
        className="bg-black w-[320px] "
        onClick={() => {
          setcreateAccountStatus();
        }}
      >
        CreateAccount
      </Button>

      {iscreateAccount == true ? (
        <div className="w-max h-max flex flex-col ">
          <div className="w-3xl h-[450px] bg-[#385170] grid grid-cols-3 place-items-center border rounded-3xl">
            {seedArr.map((e) => {
              return (
                <Button key={e} className="text-black bg-[#9fd3c7]">
                  random
                </Button>
              );
            })}
          </div>
          <div className="w-3xl h-10 bg-[#ececec] rounded-3xl flex items-center justify-center gap-x-4 ">
            <p> copy the mnemonic in safe place</p>
            <button>
              <Copy />
            </button>
          </div>
        </div>
      ) : null}
      <p className="text-white text-2xl">Or</p>
      <Button className="w-[320px] px-20 bg-black">
        Import Mnemonic Phrase{" "}
      </Button>
      <Button className="w-[320px] px-20 bg-black">Import Private Key</Button>
    </div>
  );
}
