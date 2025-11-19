import { Wallet } from 'lucide-react'

interface WalletConnectProps {
  isConnected: boolean
  onConnect: () => void
  onDisconnect: () => void
}

export default function WalletConnect({
  isConnected,
  onConnect,
  onDisconnect,
}: WalletConnectProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Wallet size={24} className="text-primary" />
        <div>
          <h2 className="font-semibold text-lg">Wallet Connection</h2>
          <p className="text-text/60 text-sm">
            {isConnected
              ? 'Wallet: 5YNmS1...3bKwR'
              : 'Connect your Solana wallet to create tokens'}
          </p>
        </div>
      </div>

      {isConnected ? (
        <button
          onClick={onDisconnect}
          className="px-6 py-2 rounded-lg bg-surface border border-error text-error hover:bg-error/5 font-medium transition-all"
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={onConnect}
          className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark hover:shadow-lg transition-all"
        >
          Connect Wallet
        </button>
      )}
    </div>
  )
}
