import { Wallet } from 'lucide-react'
import {
  WalletDisconnectButton,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui"
import { useState } from 'react'

// interface WalletConnectProps {
//   isConnected: boolean
//   onConnect: () => void
//   onDisconnect: () => void
// }

export default function WalletConnect() {
  const [walletConnected, setWalletConnected] = useState(false);

  const onConnectandDisconnect = () => {
    //set reverse value of walletconnected 
    setWalletConnected(prev => !prev)
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Wallet size={24} className="text-primary" />
        <div>
          <h2 className="font-semibold text-lg">Wallet Connection</h2>
          <p className="text-text/60 text-sm">
            {walletConnected
              ? 'Wallet: 5YNmS1...3bKwR'
              : 'Connect your Solana wallet to create tokens'}
          </p>
        </div>
      </div>

      {walletConnected ? (
        <button
          onClick={() => {
            onConnectandDisconnect()
          }}
          className="rounded-lg bg-surface border border-error text-error hover:bg-error/5 font-medium transition-all"
        >
          <WalletDisconnectButton />
        </button>
      ) : (
        <button
          onClick={() => {
            onConnectandDisconnect()
          }}
          className=" rounded-lg bg-primary text-white font-medium hover:bg-primary-dark hover:shadow-lg transition-all"
        >
          <WalletMultiButton />
        </button>
      )}
    </div>
  )
}













