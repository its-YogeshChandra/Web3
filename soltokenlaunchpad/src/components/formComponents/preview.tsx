
interface FormData {
  name: string
  symbol: string
  description: string
  logoUrl: string
  decimals: number
  initialSupply: string
  website: string
  twitter: string
  telegram: string
}

interface PreviewCardProps {
  formData: FormData
}

export default function PreviewCard({ formData }: PreviewCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-4 sticky top-24">
      <h3 className="font-semibold text-lg">Token Preview</h3>

      {/* Token Logo */}
      <div className="w-full aspect-square bg-border/20 rounded-lg flex items-center justify-center overflow-hidden border border-border">
        {formData.logoUrl ? (
          <img
            src={formData.logoUrl || "/placeholder.svg"}
            alt={formData.name}
            className="w-full h-full object-cover"
            onError={e => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {formData.symbol.slice(0, 1)}
            </div>
            <p className="text-text/50 text-sm">Token Logo</p>
          </div>
        )}
      </div>

      {/* Token Info */}
      <div className="space-y-2">
        <div>
          <p className="text-text/60 text-xs uppercase tracking-wider">Name</p>
          <p className="font-semibold text-lg text-balance">
            {formData.name || 'Token Name'}
          </p>
        </div>

        <div>
          <p className="text-text/60 text-xs uppercase tracking-wider">Symbol</p>
          <p className="font-semibold text-lg">
            {formData.symbol || 'SYMBOL'}
          </p>
        </div>

        <div>
          <p className="text-text/60 text-xs uppercase tracking-wider">Supply</p>
          <p className="font-semibold">
            {formData.initialSupply ? `${parseInt(formData.initialSupply).toLocaleString()} ${formData.symbol}` : '0'}
          </p>
        </div>

        <div>
          <p className="text-text/60 text-xs uppercase tracking-wider">Decimals</p>
          <p className="font-semibold">{formData.decimals}</p>
        </div>

        {formData.description && (
          <div>
            <p className="text-text/60 text-xs uppercase tracking-wider">Description</p>
            <p className="text-sm text-text/80 line-clamp-2">{formData.description}</p>
          </div>
        )}
      </div>

      {/* Social Links */}
      {(formData.website || formData.twitter || formData.telegram) && (
        <div className="border-t border-border pt-4">
          <p className="text-text/60 text-xs uppercase tracking-wider mb-2">Socials</p>
          <div className="flex gap-2">
            {formData.website && (
              <a
                href={formData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 text-xs rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
              >
                Website
              </a>
            )}
            {formData.twitter && (
              <a
                href={formData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 text-xs rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
              >
                Twitter
              </a>
            )}
            {formData.telegram && (
              <a
                href={formData.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 text-xs rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
              >
                Telegram
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
