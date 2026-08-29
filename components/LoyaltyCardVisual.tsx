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
      className="relative aspect-[5/8] w-full overflow-hidden rounded-[22px] p-5 transition-all duration-700"
      style={{
        background: '#0a0a0a',
        boxShadow: isActive
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06)'
          : '0 10px 30px -5px rgba(0, 0, 0, 0.35)',
      }}
    >
      <div
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: color }}
      />
      <div
        className="absolute -left-16 -bottom-16 h-52 w-52 rounded-full opacity-20 blur-3xl"
        style={{ background: color }}
      />
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
      <div className="absolute inset-0 rounded-[22px] border border-white/10" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Top - logo + decorative chip */}
        <div className="flex items-start justify-between">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={commerceName}
              className="h-10 w-10 rounded-xl object-cover shadow-lg"
            />
          ) : (
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-lg font-bold"
              style={{ color }}
            >
              {commerceName.charAt(0)}
            </div>
          )}
          <div className="flex gap-1">
            <div className="h-5 w-1.5 rounded-full bg-white/30" />
            <div className="h-5 w-1.5 rounded-full bg-white/15" />
          </div>
        </div>

        {/* Brand name */}
        <div className="space-y-1">
          <p className="font-[family-name:var(--font-display)] text-base font-bold text-white tracking-tight truncate">
            {commerceName}
          </p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Carte de fidélité</p>
        </div>

        {/* Points balance */}
        <div>
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1">Solde</p>
          <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-white tracking-tight truncate">
            {pointsBalance.toLocaleString()} <span className="text-xs font-semibold text-gray-400">pts</span>
          </p>
        </div>

        {/* Member name */}
        <div>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest">Titulaire</p>
          <p className="text-[11px] font-semibold text-white tracking-wide truncate">{clientName.toUpperCase()}</p>
        </div>
      </div>
    </div>
  )
}
