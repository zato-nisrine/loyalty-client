'use client'

function darken(hex: string, amount: number) {
  const num = parseInt(hex.replace('#', ''), 16)
  let r = (num >> 16) - amount
  let g = ((num >> 8) & 0x00ff) - amount
  let b = (num & 0x0000ff) - amount
  r = Math.max(0, r)
  g = Math.max(0, g)
  b = Math.max(0, b)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export default function LoyaltyCardVisual({
  commerceName,
  logoUrl,
  brandColor,
  pointsBalance,
  clientName,
  isActive = true,
}: {
  commerceName: string
  logoUrl?: string | null
  brandColor: string
  pointsBalance: number
  clientName: string
  isActive?: boolean
}) {
  const color = brandColor || '#C2410C'
  const darkColor = darken(color, 40)
  const lighterColor = lighten(color, 30)

  return (
    <div
      className={`relative aspect-[1.586/1] w-full overflow-hidden rounded-3xl p-4 sm:p-6 shadow-2xl transition-all duration-500 ${
        isActive ? 'shadow-2xl' : 'shadow-lg'
      }`}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${darkColor} 50%, ${color} 100%)`,
        transform: isActive ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      {/* Simplified background elements for better readability */}
      <div 
        className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5"
      />
      <div 
        className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-white/5"
      />
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          {logoUrl ? (
            <div className="relative flex-shrink-0">
              <img 
                src={logoUrl} 
                alt={commerceName} 
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl object-cover shadow-lg ring-2 ring-white/30" 
              />
              <div className="absolute inset-0 rounded-xl bg-white/10" />
            </div>
          ) : (
            <div 
              className="flex h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/95 text-base sm:text-lg font-bold shadow-lg ring-2 ring-white/30"
              style={{ color }}
            >
              {commerceName.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold text-white tracking-normal truncate">
              {commerceName}
            </p>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-normal text-white/90">Carte de fidélité</p>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <div className="h-5 w-1 rounded-full bg-white/50" />
            <div className="h-5 w-1 rounded-full bg-white/40" />
            <div className="h-5 w-1 rounded-full bg-white/30" />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-normal text-white font-semibold">Solde de points</p>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <p className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-white tracking-normal">
              {pointsBalance}
            </p>
            <p className="text-xs sm:text-sm font-bold text-white">pts</p>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-bold text-white truncate">{clientName}</p>
            <p className="text-[10px] sm:text-[11px] text-white/80">Membre actif</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="h-7 w-10 sm:h-8 sm:w-12 rounded bg-white/40 backdrop-blur-sm" />
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 border-white/50" />
          </div>
        </div>
      </div>
    </div>
  )
}

function lighten(hex: string, amount: number) {
  const num = parseInt(hex.replace('#', ''), 16)
  let r = (num >> 16) + amount
  let g = ((num >> 8) & 0x00ff) + amount
  let b = (num & 0x0000ff) + amount
  r = Math.min(255, r)
  g = Math.min(255, g)
  b = Math.min(255, b)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
