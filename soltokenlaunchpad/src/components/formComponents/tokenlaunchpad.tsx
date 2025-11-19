import { useState } from 'react'
import { useToast } from '../../context/toastContext'
import WalletConnect from './walletconnect'
import TokenForm from './tokenform'
import PreviewCard from './preview'

export default function TokenLaunchpad() {
  const [isConnected, setIsConnected] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    logoUrl: '',
    decimals: 9,
    initialSupply: '',
    metadataUri: '',
    revokeMintAuthority: false,
    revokeFreezeAuthority: false,
    website: '',
    twitter: '',
    telegram: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addToast } = useToast()

  const handleConnect = () => {
    setIsConnected(true)
    addToast('Wallet connected successfully!', 'success')
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    addToast('Wallet disconnected', 'info')
  }

  const handleFormChange = (data: typeof formData) => {
    setFormData(data)
  }

  const handleSubmit = async () => {
    if (!isConnected) {
      addToast('Please connect your wallet first', 'error')
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      addToast('Token created successfully!', 'success')
      // Reset form
      setFormData({
        name: '',
        symbol: '',
        description: '',
        logoUrl: '',
        decimals: 9,
        initialSupply: '',
        metadataUri: '',
        revokeMintAuthority: false,
        revokeFreezeAuthority: false,
        website: '',
        twitter: '',
        telegram: '',
      })
    } catch (error) {
      addToast('Failed to create token', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <WalletConnect
        isConnected={isConnected}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TokenForm
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isConnected={isConnected}
          />
        </div>

        <div>
          <PreviewCard formData={formData} />
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-4 right-4 space-y-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg text-white pointer-events-auto ${toast.type === 'success'
            ? 'bg-success'
            : toast.type === 'error'
              ? 'bg-error'
              : 'bg-primary'
            }`}
        >
          {toast.message}
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 opacity-75 hover:opacity-100"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
