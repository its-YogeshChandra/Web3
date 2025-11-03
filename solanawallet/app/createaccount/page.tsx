"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useState } from "react";
import { walletServices } from "@/services/createWallet";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { on } from "events";
interface Inputs {
  password: string;
}
export default function SeedPhrase() {
  const seedArr = [
    "title",
    "rug",
    "spare",
    "flower",
    "teach",
    "prosper",
    "height",
    "control",
    "scene",
    "derive",
    "bike",
    "coin",
  ];
  const [mnemonicPhrase, setMnemonicPhrase] = useState(seedArr);
  const [iscreateAccount, setIsCreateAccount] = useState(false);
  const [isMnemonicPhrase, setIsMnemonicPhrase] = useState(false);
  const [isPrivateKey, setIsPrivateKey] = useState(false);
  const [onPhasePassword, setonPhasePassword] = useState(false);

  const router = useRouter();

  //extract nessecary elements from the useform
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  let passwordData = { password: "" };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    passwordData.password = data.password;
    setonPhasePassword((prev) => !prev);
    setIsCreateAccount((prev) => !prev);
  };

  const createAccount = () => {
    const mnemonicPhrase = walletServices.createMnemonicAddress();
    setMnemonicPhrase(mnemonicPhrase);
  };

  //copy the string to the clipboard
  const copytoClipBoard = (value: string[]) => {
    //convert the value into string
    const data: string = value.join(" ");
    navigator.clipboard.writeText(data);

    //check if data get successfully copied or not
    navigator.clipboard
      .readText()
      .then((copiedText) => {
        if (copiedText == data) {
          alert("mnemonic successfully copied");
                
          //navigate to the dashboard 
          router.push("/dashboard");
        }
        // You can then use 'copiedText' as needed, e.g., display it in an element.
      })
      .catch((err) => {
        console.error("Failed to read clipboard contents: ", err);
      });
  };

  //function to setcreate account status
  const setcreateAccountStatus = () => {
    setonPhasePassword((prev) => !prev);
  };

  return (
    <div className="bg-[#051715] w-screen h-screen flex flex-col gap-y-3 items-center justify-center">
      <Button
        className="bg-black w-[320px] "
        onClick={() => {
          setcreateAccountStatus();
          createAccount();
        }}
      >
        CreateAccount
      </Button>
      {onPhasePassword == true ? (
        <div className="w-[350px] h-max bg-purple-500 ">
          <form onSubmit={handleSubmit(onSubmit)} className="p-2">
            <p>New Password</p>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            <Button type="submit" className="mt-2 w-full">
              Proceed
            </Button>
          </form>
        </div>
      ) : null}
      {iscreateAccount == true ? (
        <div className="w-max h-max flex flex-col ">
          <div className="w-3xl h-[450px] bg-[#385170] grid grid-cols-3  place-items-center border rounded-3xl">
            {mnemonicPhrase.map((e) => {
              return (
                <Button key={e} className="text-black bg-[#9fd3c7]">
                  {e}
                </Button>
              );
            })}
          </div>
          <div className="w-3xl h-10 bg-[#ececec] rounded-2xl mt-2 flex items-center justify-center gap-x-4 ">
            <button
              className="w-full flex justify-center gap-x-3"
              onClick={() => {
                copytoClipBoard(mnemonicPhrase);
              }}
            >
              <p> copy the mnemonic in safe place</p>
              <Copy />
            </button>
          </div>
        </div>
      ) : null}
      <p className="text-white text-2xl">Or</p>
      <Button
        className="w-[320px] px-20 bg-black "
        onClick={() => {
          setIsMnemonicPhrase((prev) => !prev);
        }}
      >
        Import Mnemonic Phrase{" "}
      </Button>
      {isMnemonicPhrase == true ? (
        <div className="w-2xl h-[200px] bg-blue-400 flex flex-col gap-y-2">
          <Input type="text" className="w-full h-full" />
          <Button
            className="rounded-none bg-black "
            onClick={() => {
              setIsMnemonicPhrase((prev) => !prev);
            }}
          >
            Add Mnemonic
          </Button>
        </div>
      ) : null}
      <Button
        className="w-[320px] px-20 bg-black"
        onClick={() => {
          setIsPrivateKey((prev) => !prev);
        }}
      >
        Import Private Key
      </Button>

      {isPrivateKey == true ? (
        <div className="w-2xl h-[200px] bg-blue-400 flex flex-col gap-y-2">
          <Input type="text" className="w-full h-full" />
          <Button
            className="rounded-none bg-black "
            onClick={() => {
              setIsPrivateKey((prev) => !prev);
            }}
          >
            Add Mnemonic
          </Button>
        </div>
      ) : null}
    </div>
  );
}
