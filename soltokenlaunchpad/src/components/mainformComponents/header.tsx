import { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

function HeaderComp() {
  const [thememode, setthememode] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggletheme = (theme: string) => {
    if (!theme || theme == undefined || theme == null || theme == "") {
      return;
    }
    if (theme == "light") {
      setthememode("dark");
    } else if (theme == "dark") {
      setthememode("light");
    }
  };

  return (
    <div className="w-full bg-white border-b ">
      {/* Desktop and Mobile Header */}
      <div className="w-full py-3 px-4 md:py-4 md:px-5 flex flex-row items-center justify-between">
        {/* Logo and Title - Responsive sizing */}
        <div className="flex flex-row items-center gap-x-3 md:gap-x-5">
          <img
            src="../../../logo.png"
            alt="Sol Forge Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          />
          <div>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold whitespace-nowrap">
              SOL FORGE
            </p>
            < p> Powering the Future of Decentralized Ideas</p>
          </div>
        </div>

        {/* Desktop Controls - Hidden on mobile */}
        <div className="hidden md:flex gap-x-3 lg:gap-x-5 items-center">
          <div className="py-1 px-3 lg:px-5 border border-slate-500 hover:border-black rounded-2xl transition-colors">
            <p className="text-sm lg:text-base whitespace-nowrap">Solana Testnet</p>
          </div>
          {thememode == "light" ? (
            <button
              onClick={() => {
                toggletheme("light");
              }}
              className="p-2 hover:bg-[#407088] rounded-4xl transition-colors"
              aria-label="Switch to dark mode"
            >
              <Sun className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          ) : (
            <button
              onClick={() => {
                toggletheme("dark");
              }}
              className="p-2 hover:bg-red-500 rounded-lg transition-colors"
              aria-label="Switch to light mode"
            >
              <Moon className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          )}
        </div>

        {/* Mobile Menu Button - Visible only on mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-red-500 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu - Toggleable dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full px-4 pb-4 flex flex-col gap-y-3 border-t border-red-500">
          <div className="mt-3 py-2 px-4 border border-slate-500 rounded-2xl text-center">
            <p className="text-sm">Solana Testnet</p>
          </div>
          <button
            onClick={() => {
              toggletheme(thememode);
            }}
            className="py-2 px-4 border border-slate-500 rounded-2xl flex items-center justify-center gap-x-2 hover:bg-red-500 transition-colors"
          >
            {thememode == "light" ? (
              <>
                <Sun className="w-5 h-5" />
                <span className="text-sm">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" />
                <span className="text-sm">Dark Mode</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default HeaderComp;
