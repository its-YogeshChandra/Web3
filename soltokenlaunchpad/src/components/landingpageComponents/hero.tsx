import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <div className="w-full mx-auto pt-20 md:pt-0">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 max-w-5xl mx-auto px-4">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
              <span className="text-cyan-500">Token Launchpad</span>
              <br />
              <span className="text-slate-900">on Solana</span>
            </h1>
            <div className="w-12 sm:w-16 h-1 bg-linear-to-r from-cyan-400 to-cyan-500 mt-6 rounded-full mx-auto lg:mx-0 transition-all duration-300 hover:w-24 hover:shadow-lg"></div>
          </div>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            “Ignite your project with momentum—empower your token with a launch built for success.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
            <button
              className="w-full sm:w-auto bg-linear-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white rounded-full px-6 sm:px-8 py-6 font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Let's Start<span>→</span>
            </button>
            <button
              className="rounded-full border border-slate-300 text-white hover:bg-white px-6 py-6 transition-all duration-300 hover:scale-110 hover:shadow-md flex items-center justify-center"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
            <span className="text-xs sm:text-sm font-semibold text-slate-600">ONEPAGER</span>
          </div>
        </div>

        {/* Image Container */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md h-64 md:h-80 lg:h-96 transition-transform duration-300 hover:scale-105">
            <img
              src="../../../landingtoken.png"
              alt="Cyber Protection Blockchain Illustration"
              className="w-full h-full object-cover rounded-2xl transition-all duration-300 hover:shadow-cyan-500/50"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

