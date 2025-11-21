import { useMemo } from "react"
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Outlet } from "react-router";


function Layout() {

  const network = WalletAdapterNetwork.Devnet;

  const errorHandler = (error: Error) => {
    //return the error
    console.log(error);
  }

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(),
    new LedgerWalletAdapter()], [network]
  )
  const endpoint = import.meta.env.DEVNET_URL
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect onError={errorHandler}>
        <WalletModalProvider>
          <div className="w-screen h-screen">
            <Outlet />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider >
  )
}

export default Layout
