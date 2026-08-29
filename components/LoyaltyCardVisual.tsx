'use client'

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

  return (
    <div
      className={`relative aspect-[1.586/1] w-full overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-700 ${
        isActive ? 'shadow-2xl scale-100' : 'shadow-lg scale-95 opacity-80'
      }`}
      style={{
        background: '#0a0a0a',
        boxShadow: isActive 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
          : '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Gradient glow effect - top right */}
      <div 
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: color }}
      />
      {/* Gradient glow effect - bottom left */}
      <div 
        className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: color }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Glass effect border */}
      <div className="absolute inset-0 rounded-3xl border border-white/10" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Header - Logo and brand name */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {logoUrl ? (
              <div className="relative">
                <img 
                  src={logoUrl} 
                  alt={commerceName} 
                  className="h-14 w-14 rounded-2xl object-cover shadow-xl" 
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
              </div>
            ) : (
              <div 
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl font-bold"
                style={{ color }}
              >
                {commerceName.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-[family-name:var(--font-display)] text-lg font-bold text-white tracking-tight">
                {commerceName}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Carte de fidélité</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-7 w-2 rounded-full bg-white/30" />
            <div className="h-7 w-2 rounded-full bg-white/20" />
            <div className="h-7 w-2 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Center - Points balance (like card number) */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">Solde de points</p>
          <div className="flex items-baseline gap-3">
            <p className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl font-bold text-white tracking-tight">
              {pointsBalance.toLocaleString()}
            </p>
            <p className="text-base font-semibold text-gray-400">pts</p>
          </div>
        </div>

        {/* Footer - Client name and decorative elements */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-widest">Titulaire</p>
            <p className="text-sm font-semibold text-white tracking-wide">{clientName.toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs text-gray-500 uppercase tracking-widest">Valide</p>
              <p className="text-sm font-semibold text-white">12/28</p>
            </div>
            <div className="h-10 w-14 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full border-2 border-white/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
