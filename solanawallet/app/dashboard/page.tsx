import { Button } from "@/components/ui/button"

export default function(){
return (
    <div className="w-screen h-screen bg-[#051715] flex flex-col gap-y-2 items-center  p-24">
     <div className="w-xl h-[100px] bg-yellow-300 flex flex-col justify-center items-center">
        <p className="text-6xl">100</p>
        <p className="text-4xl">SOL</p>
     </div>
     <div className="w-xl h-max p-1 flex justify-center">
       <Button>Send</Button>
       <Button>Receive</Button>
     </div>
     <div className="w-xl h-[250px] bg-red-300 ">
       <p>Token</p>
       <p>wallet Adress</p>
     </div>
    </div>

 
)

};