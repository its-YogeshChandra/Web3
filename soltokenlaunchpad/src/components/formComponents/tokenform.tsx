
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import FormField from './formfield'
import Tooltip from './Tooltip'

interface FormData {
  name: string
  symbol: string
  description: string
  logoUrl: string
  decimals: number
  initialSupply: string
  metadataUri: string
  revokeMintAuthority: boolean
  revokeFreezeAuthority: boolean
  website: string
  twitter: string
  telegram: string
}

interface TokenFormProps {
  formData: FormData
  onChange: (data: FormData) => void
  onSubmit: () => void
  isSubmitting: boolean
  isConnected: boolean
}

export default function TokenForm({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  isConnected,
}: TokenFormProps) {
  const [expandAuthority, setExpandAuthority] = useState(false)
  const [expandSocial, setExpandSocial] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Token name is required'
    if (formData.name.length > 32) newErrors.name = 'Token name must be max 32 characters'

    if (!formData.symbol.trim()) newErrors.symbol = 'Token symbol is required'
    if (formData.symbol.length > 10) newErrors.symbol = 'Token symbol must be max 10 characters'

    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (formData.description.length > 200) newErrors.description = 'Description must be max 200 characters'

    if (!formData.logoUrl.trim()) newErrors.logoUrl = 'Logo URL is required'
    if (!isValidUrl(formData.logoUrl)) newErrors.logoUrl = 'Invalid URL format'

    if (!formData.initialSupply) newErrors.initialSupply = 'Initial supply is required'
    if (parseInt(formData.initialSupply) < 1) newErrors.initialSupply = 'Initial supply must be at least 1'

    if (formData.metadataUri && !isValidUrl(formData.metadataUri)) {
      newErrors.metadataUri = 'Invalid URL format'
    }

    if (formData.website && !isValidUrl(formData.website)) newErrors.website = 'Invalid URL format'
    if (formData.twitter && !isValidUrl(formData.twitter)) newErrors.twitter = 'Invalid URL format'
    if (formData.telegram && !isValidUrl(formData.telegram)) newErrors.telegram = 'Invalid URL format'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit()
    }
  }

  const handleChange = (field: keyof FormData, value: any) => {
    onChange({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  return (
    <form className="bg-surface border border-border rounded-lg p-6 space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{
              width: `${Object.keys(errors).length === 0 ? 100 : 33
                }%`,
            }}
          ></div>
        </div>
      </div>

      {/* Basic Token Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Token Information</h3>

        <FormField
          label="Token Name"
          required
          error={errors.name}
          helperText={`${formData.name.length}/32 characters`}
        >
          <input
            type="text"
            placeholder="e.g., My Awesome Token"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            maxLength={32}
            className={errors.name ? 'border-error' : ''}
          />
        </FormField>

        <FormField
          label="Token Symbol"
          required
          error={errors.symbol}
          helperText={`${formData.symbol.length}/10 characters`}
        >
          <input
            type="text"
            placeholder="e.g., MAT"
            value={formData.symbol.toUpperCase()}
            onChange={e => handleChange('symbol', e.target.value.toUpperCase())}
            maxLength={10}
            className={errors.symbol ? 'border-error' : ''}
          />
        </FormField>

        <FormField
          label="Token Description"
          required
          error={errors.description}
          helperText={`${formData.description.length}/200 characters`}
        >
          <textarea
            placeholder="Describe your token's purpose..."
            value={formData.description}
            onChange={e => handleChange('description', e.target.value)}
            maxLength={200}
            rows={4}
            className={errors.description ? 'border-error' : ''}
          />
        </FormField>

        <FormField
          label="Token Logo URL"
          required
          error={errors.logoUrl}
        >
          <input
            type="url"
            placeholder="https://example.com/logo.png"
            value={formData.logoUrl}
            onChange={e => handleChange('logoUrl', e.target.value)}
            className={errors.logoUrl ? 'border-error' : ''}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Decimals"
            required
            helperText="Most tokens use 6 or 9 decimals"
          >
            <select
              value={formData.decimals}
              onChange={e => handleChange('decimals', parseInt(e.target.value))}
              className="w-full"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            label="Initial Supply"
            required
            error={errors.initialSupply}
          >
            <input
              type="number"
              placeholder="1000000"
              value={formData.initialSupply}
              onChange={e => handleChange('initialSupply', e.target.value)}
              min="1"
              className={errors.initialSupply ? 'border-error' : ''}
            />
          </FormField>
        </div>

        <FormField
          label="Metadata URI"
          error={errors.metadataUri}
        >
          <div className="flex items-center gap-2">
            <input
              type="url"
              placeholder="https://example.com/metadata.json"
              value={formData.metadataUri}
              onChange={e => handleChange('metadataUri', e.target.value)}
              className={errors.metadataUri ? 'border-error' : ''}
            />
            <Tooltip text="Optional off-chain metadata URL for additional token information" />
          </div>
        </FormField>
      </div>

      {/* Authority Settings */}
      <div className="border-t border-border pt-6">
        <button
          type="button"
          onClick={() => setExpandAuthority(!expandAuthority)}
          className="flex items-center gap-2 font-semibold text-lg hover:text-primary transition-colors"
        >
          <ChevronDown
            size={20}
            className={`transition-transform ${expandAuthority ? 'rotate-180' : ''}`}
          />
          Authority Settings
        </button>

        {expandAuthority && (
          <div className="mt-4 space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.revokeMintAuthority}
                onChange={e => handleChange('revokeMintAuthority', e.target.checked)}
                className="w-5 h-5"
              />
              <div className="flex items-center gap-2">
                <span>Disable minting after creation (fixed supply)</span>
                <Tooltip text="Prevents creation of additional tokens after initial supply" />
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.revokeFreezeAuthority}
                onChange={e => handleChange('revokeFreezeAuthority', e.target.checked)}
                className="w-5 h-5"
              />
              <div className="flex items-center gap-2">
                <span>Disable freeze capability (cannot freeze token accounts)</span>
                <Tooltip text="Removes ability to freeze token accounts after creation" />
              </div>
            </label>
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="border-t border-border pt-6">
        <button
          type="button"
          onClick={() => setExpandSocial(!expandSocial)}
          className="flex items-center gap-2 font-semibold text-lg hover:text-primary transition-colors"
        >
          <ChevronDown
            size={20}
            className={`transition-transform ${expandSocial ? 'rotate-180' : ''}`}
          />
          Social Links (Optional)
        </button>

        {expandSocial && (
          <div className="mt-4 space-y-4">
            <FormField
              label="Website URL"
              error={errors.website}
            >
              <input
                type="url"
                placeholder="https://example.com"
                value={formData.website}
                onChange={e => handleChange('website', e.target.value)}
                className={errors.website ? 'border-error' : ''}
              />
            </FormField>

            <FormField
              label="Twitter URL"
              error={errors.twitter}
            >
              <input
                type="url"
                placeholder="https://twitter.com/yourproject"
                value={formData.twitter}
                onChange={e => handleChange('twitter', e.target.value)}
                className={errors.twitter ? 'border-error' : ''}
              />
            </FormField>

            <FormField
              label="Telegram URL"
              error={errors.telegram}
            >
              <input
                type="url"
                placeholder="https://t.me/yourgroup"
                value={formData.telegram}
                onChange={e => handleChange('telegram', e.target.value)}
                className={errors.telegram ? 'border-error' : ''}
              />
            </FormField>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isConnected || isSubmitting}
        className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${isConnected
          ? 'bg-primary hover:bg-primary-dark hover:shadow-lg'
          : 'bg-text/20 cursor-not-allowed'
          }`}
      >
        {isSubmitting ? 'Creating Token...' : 'Create Token'}
      </button>
    </form>
  )
}
