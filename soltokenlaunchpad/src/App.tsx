// wallet adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';



function App() {
  return (
    <div>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div style={{
              padding: 20
            }}>
              <Outlet />
              <Toaster
                position="bottom-left"
                theme="light"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: "#111",
                    color: "#fff",
                    borderRadius: "8px",
                  },
                }}
              />

            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App;
