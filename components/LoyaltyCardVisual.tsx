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
      className={`relative aspect-[1.586/1] w-full overflow-hidden rounded-3xl p-5 sm:p-7 transition-all duration-700 ${
        isActive ? 'shadow-2xl scale-100' : 'shadow-lg scale-95 opacity-80'
      }`}
      style={{
        background: '#0a0a0a',
        boxShadow: isActive 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
          : '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Gradient glow effect */}
      <div 
        className="absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ background: color }}
      />
      <div 
        className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: color }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Glass effect border */}
      <div className="absolute inset-0 rounded-3xl border border-white/10" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <div className="relative">
                <img 
                  src={logoUrl} 
                  alt={commerceName} 
                  className="h-12 w-12 rounded-xl object-cover shadow-lg" 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
              </div>
            ) : (
              <div 
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-xl font-bold"
                style={{ color }}
              >
                {commerceName.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-[family-name:var(--font-display)] text-base font-semibold text-white">
                {commerceName}
              </p>
              <p className="text-xs text-gray-500">Carte de fidélité</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="h-6 w-1.5 rounded-full bg-white/20" />
            <div className="h-6 w-1.5 rounded-full bg-white/15" />
            <div className="h-6 w-1.5 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Points balance */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Solde de points</p>
          <div className="flex items-baseline gap-2">
            <p className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl font-bold text-white tracking-tight">
              {pointsBalance}
            </p>
            <p className="text-sm font-semibold text-gray-400">pts</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-white">{clientName}</p>
            <p className="text-xs text-gray-500">Membre actif</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-12 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10" />
            <div className="h-8 w-8 rounded-full border-2 border-white/20 bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  )
}
