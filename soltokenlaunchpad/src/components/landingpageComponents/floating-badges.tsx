import { useEffect, useState } from 'react'

interface Badge {
  id: number
  percentage: string
  top: string
  left: string
  delay: number
  color: 'pink' | 'yellow' | 'purple' | 'orange'
}

const badges: Badge[] = [
  { id: 1, percentage: '75%', top: '15%', left: '65%', delay: 0, color: 'pink' },
  { id: 2, percentage: '63%', top: '35%', left: '72%', delay: 0.2, color: 'yellow' },
  { id: 3, percentage: '89%', top: '55%', left: '68%', delay: 0.4, color: 'purple' },
  { id: 4, percentage: '92%', top: '25%', left: '85%', delay: 0.6, color: 'orange' },
]

const colorMap = {
  pink: 'bg-pink-400',
  yellow: 'bg-yellow-400',
  purple: 'bg-purple-500',
  orange: 'bg-orange-400',
}

const textColorMap = {
  pink: 'text-pink-600',
  yellow: 'text-yellow-600',
  purple: 'text-purple-700',
  orange: 'text-orange-600',
}

export default function FloatingBadges() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-2xl h-96 perspective">
      {/* 3D Device Illustration Area */}
      <div className="relative w-full h-full">
        {/* Isometric device/platform background shape */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Main platform - isometric style */}
          <defs>
            <linearGradient id="deviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d8b4fe" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>

          {/* Large isometric device */}
          <polygon
            points="150,150 350,100 450,200 250,250"
            fill="url(#deviceGradient)"
            opacity="0.9"
          />
          <polygon
            points="150,150 150,300 250,350 250,250"
            fill="#1e40af"
            opacity="0.8"
          />
          <polygon
            points="350,100 450,150 450,320 350,270"
            fill="#3b82f6"
            opacity="0.7"
          />

          {/* Screen/display area */}
          <rect
            x="170"
            y="130"
            width="160"
            height="100"
            fill="#0f172a"
            rx="4"
          />

          {/* Chart visualization on screen */}
          <polyline
            points="190,200 210,170 230,185 250,150 270,165 300,140 320,155"
            stroke="#06b6d4"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Floating badges */}
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`absolute transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            style={{
              top: badge.top,
              left: badge.left,
              transitionDelay: `${badge.delay}s`,
            }}
          >
            <div
              className={`${colorMap[badge.color]} rounded-full p-3 shadow-lg flex items-center justify-center w-16 h-16`}
            >
              <span className={`${textColorMap[badge.color]} font-bold text-xl`}>
                {badge.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

