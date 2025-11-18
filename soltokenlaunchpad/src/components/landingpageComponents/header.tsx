
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const navItems = ['Overview', 'About Us', 'How It Works', 'Crypto Calculator', 'Token', 'Roadmap', 'Team']
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            <img
              src='../../../logo.png'
              alt='logo of the site' />
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-slate-900 text-2xl">SolForge</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              //className="text-sm font-medium text-red-500 hover:text-[#96b1ac] transition-all duration-300 hover:scale-105"
              className=' bg-white text-red-500 '
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <button
            className="hidden sm:block px-4 py-2 rounded-full border border-slate-300 text-white hover:bg-slate-50 transition-all duration-300 hover:scale-110 text-sm font-medium"
          >
            Eng ▼
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {
        isOpen && (
          <nav className="lg:hidden bg-white border-t border-slate-100 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-[#96b1ac] hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-300 hover:translate-x-1"
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        )
      }
    </header >
  )
}
