import { Info } from 'lucide-react'
import { useState } from 'react'

interface TooltipProps {
  text: string
}

export default function Tooltip({ text }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible(!visible)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/20 text-primary hover:bg-primary/30"
      >
        <Info size={12} />
      </button>

      {visible && (
        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-surface border border-primary rounded-lg text-sm text-text shadow-lg z-10">
          {text}
          <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border"></div>
        </div>
      )}
    </div>
  )
}
