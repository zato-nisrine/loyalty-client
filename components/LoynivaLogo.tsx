import React from 'react'

export default function LoynivaLogo({
  size = 'md',
  showTagline = false,
  inverted = false,
}: {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
  inverted?: boolean
}) {
  const iconSizes = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
  }

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div
        className={`relative flex ${iconSizes[size]} items-center justify-center rounded-xl shadow-sm transition-transform hover:scale-105`}
        style={{
          background: 'linear-gradient(135deg, #102A43 0%, #1A3E61 60%, #4F9DCE 100%)',
        }}
      >
        {/* Monogram LOYNIVA icon: dynamic nodes connecting */}
        <svg
          className="h-3/5 w-3/5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 4v16h12" />
          <circle cx="18" cy="12" r="3" fill="#4F9DCE" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M6 12h9" stroke="#4F9DCE" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold tracking-tight ${textSizes[size]} ${
            inverted ? 'text-white' : 'text-[#102A43] dark:text-[#F5F8FC]'
          }`}
        >
          LOY<span className="text-[#4F9DCE]">NIVA</span>
        </span>
        {showTagline && (
          <span
            className={`mt-1 text-[11px] font-medium tracking-wide ${
              inverted ? 'text-white/80' : 'text-[#5B7286] dark:text-[#8FA6BA]'
            }`}
          >
            Chaque visite compte.
          </span>
        )}
      </div>
    </div>
  )
}
