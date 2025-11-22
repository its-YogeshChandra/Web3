import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useState } from "react"


function App() {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()

  return (
    <>
      <div className='w-screen h-screen bg-slate-800 flex flex-col items-center justify-center ' >
        < div className="w-[570px] h-max  mb-5 rounded-2xl flex justify-between">
          <WalletMultiButton />
          <WalletDisconnectButton />
        </div>
        <div className='w-[570px] h-[420px] backdrop-blur-2xl bg-white p-2 flex flex-col gap-y-3 '>
          <div className='w-full h-[49%] bg-fuchsia-400 backdrop-blur-2xl  flex flex-col items-center justify-center'>
            <div className='w-full h-max flex justify-between px-8  '>
              <p className='text-3xl'>From</p>
              <p className='text-xl'>Balance</p>
            </div>
            <div className='w-full h-max flex px-8 justify-between  '>
              <p className='text-xl'>SOL</p>
              <input type='number'
                className='bg-white w-30'
              />
            </div>
          </div>
          <div className='w-full h-[50%] bg-fuchsia-400  p-2 flex flex-col items-center justify-center'>
            <div className='w-full h-max flex justify-between px-8  '>
              <p className='text-3xl'>To</p>
              <p className='text-xl'>Balance</p>
            </div>
            <div className='w-full h-max flex px-8 justify-between  '>
              <p className='text-xl'>USDC</p>
              <input type='number'
                className='bg-white w-30'
              />
            </div>

          </div>
        </div>
        <div className='w-[570px] h-24 bg-amber-600 rounded-2xl flex justify-center items-center '>
          <button className="text-2xl"> SWAP</button>
        </div>
      </div >
    </>
  )
}

export default App
