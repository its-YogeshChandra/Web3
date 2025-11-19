import {
  WalletDisconnectButton,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui"

function WalletConnector() {
  return (
    <div className="w-full h-40 bg-emerald-500 mt-10 flex items-center">

      {/* wallet connection */}


      <WalletMultiButton />
      <WalletDisconnectButton />

    </div>

  )
}

export default WalletConnector;
