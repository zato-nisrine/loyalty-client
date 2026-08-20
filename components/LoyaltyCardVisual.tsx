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
      className={`relative aspect-[1.586/1] w-full overflow-hidden rounded-3xl p-6 shadow-2xl transition-all duration-500 ${
        isActive ? 'shadow-2xl' : 'shadow-lg'
      }`}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${darkColor} 50%, ${color} 100%)`,
        transform: isActive ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      {/* Animated background elements */}
      <div 
        className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 animate-pulse"
        style={{ animationDuration: '3s' }}
      />
      <div 
        className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-white/5"
        style={{ animation: 'float 6s ease-in-out infinite' }}
      />
      <div className="absolute right-8 top-1/2 h-32 w-32 rounded-full bg-white/5 blur-xl" />
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      
      {/* Shimmer effect */}
      {isActive && (
        <div 
          className="absolute inset-0 overflow-hidden rounded-3xl"
          style={{ animation: 'shimmer 3s ease-in-out infinite' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <div className="relative">
              <img 
                src={logoUrl} 
                alt={commerceName} 
                className="h-11 w-11 rounded-xl object-cover shadow-lg ring-2 ring-white/20" 
              />
              <div className="absolute inset-0 rounded-xl bg-white/10" />
            </div>
          ) : (
            <div 
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-lg font-bold shadow-lg ring-2 ring-white/20"
              style={{ color }}
            >
              {commerceName.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <p className="font-[family-name:var(--font-display)] text-base font-bold text-white tracking-wide">
              {commerceName}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-white/60">Carte de fidélité</p>
          </div>
          <div className="flex gap-1">
            <div className="h-6 w-1 rounded-full bg-white/30" />
            <div className="h-6 w-1 rounded-full bg-white/20" />
            <div className="h-6 w-1 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-medium">Solde de points</p>
          <div className="flex items-baseline gap-2">
            <p className="font-[family-name:var(--font-display)] text-5xl font-bold text-white tracking-tight">
              {pointsBalance}
            </p>
            <p className="text-sm font-medium text-white/80">pts</p>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-white/90">{clientName}</p>
            <p className="text-[10px] text-white/50">Membre actif</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-12 rounded bg-white/20 backdrop-blur-sm" />
            <div className="h-8 w-8 rounded-full border-2 border-white/30" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
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
