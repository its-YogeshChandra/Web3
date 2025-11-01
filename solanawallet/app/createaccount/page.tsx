import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function SeedPhrase() {
  const seedArr = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="bg-slate-900 w-screen h-screen flex flex-col gap-y-3 items-center justify-center">
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
  );
}
