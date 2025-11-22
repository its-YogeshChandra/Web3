import { useMemo } from "react"
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Outlet } from "react-router";
import '@solana/wallet-adapter-react-ui/styles.css'

function Layout() {

  //  const network = WalletAdapterNetwork.Devnet;

  const errorHandler = (error: Error) => {
    //return the error
    console.log(error);
  }
  const endpoint = import.meta.env.VITE_DEVNET_URL
  return (<div>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect onError={errorHandler}>
        <WalletModalProvider>
          <div className="w-screen h-screen">
            <Outlet />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider >
  </div>)
}

export default Layout
