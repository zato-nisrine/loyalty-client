'use client'

import React from 'react'
import Image from 'next/image'

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
  inverted?: boolean
  variant?: 'symbol' | 'badge'
  showText?: boolean
  className?: string
}

export default function LoynivaLogo({
  size = 'md',
  showTagline = false,
  inverted = false,
  variant = 'symbol',
  showText = true,
  className = '',
}: LogoProps) {
  const symbolDimensions = {
    sm: { height: 26, width: 45, text: 'text-lg' },
    md: { height: 34, width: 59, text: 'text-xl' },
    lg: { height: 44, width: 76, text: 'text-2xl' },
  }

  const badgeDimensions = {
    sm: 'h-8 w-8 rounded-lg p-1',
    md: 'h-10 w-10 rounded-xl p-1.5',
    lg: 'h-12 w-12 rounded-2xl p-2',
  }

  const dim = symbolDimensions[size]

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {variant === 'badge' ? (
        <div
          className={`relative flex items-center justify-center bg-[#102A43] shadow-md transition-transform hover:scale-105 ${badgeDimensions[size]}`}
        >
          <img
            src="/brand/fidelity-symbol-dark.png"
            alt="Fidelity"
            className="h-full w-auto object-contain"
            draggable={false}
          />
        </div>
      ) : (
        <div className="relative flex items-center justify-center transition-transform hover:scale-105">
          {/* Light mode symbol (Navy & Vibrant Blue) */}
          <img
            src="/brand/fidelity-symbol.png"
            alt="Fidelity"
            style={{ height: `${dim.height}px`, width: 'auto' }}
            className={`object-contain select-none ${inverted ? 'hidden' : 'block dark:hidden'}`}
            draggable={false}
          />
          {/* Dark mode / inverted symbol (White & Vibrant Blue) */}
          <img
            src="/brand/fidelity-symbol-dark.png"
            alt="Fidelity"
            style={{ height: `${dim.height}px`, width: 'auto' }}
            className={`object-contain select-none ${inverted ? 'block' : 'hidden dark:block'}`}
            draggable={false}
          />
        </div>
      )}

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-brand font-extrabold tracking-wider ${dim.text} ${
              inverted ? 'text-white' : 'text-[#102A43] dark:text-[#F5F8FC]'
            }`}
          >
            FIDELITY
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
      )}
    </div>
  )
}

export const FidelityLogo = LoynivaLogo
