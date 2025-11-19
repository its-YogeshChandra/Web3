
import { useTheme } from '../../context/themeContext'
import { Moon, Sun } from 'lucide-react'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-border bg-surface sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-xl font-bold text-balance">Solana Token Launchpad</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-surface border border-border text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-success rounded-full"></span>
            Solana Testnet
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-border rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
