import {
  WalletDisconnectButton,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui"
function WalletConnector() {

  // const checkAddress = (operation: string) => {
  //   //check if the connecton to wallet is true and public address is not empty or undefined 
  //   if (operation == "setWallet") {
  //     const connection = wallet.connected;
  //     if (connection == true) {
  //       setiswalletopen(prev => !prev)
  //     }
  //   }
  //   else {
  //     if (wallet.connected == false) {
  //       setiswalletopen(prev => !prev)
  //     }
  //   }
  // }
  //

  return (
    <div className="w-full h-max py-10 mt-10 border-2 border-slate-500flex items-center gap-x-3">

      {/* wallet connection */}
      <div className="w-full h-max pl-10 flex gap-x-3"> < WalletMultiButton />
        < WalletDisconnectButton />
      </div>
    </div >
  )
}

export default WalletConnector;
