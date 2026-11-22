'use client'

function formatExpDate(createdAt?: string) {
  if (!createdAt) return '08/28'
  try {
    const d = new Date(createdAt)
    const expYear = (d.getFullYear() + 2).toString().slice(-2)
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    return `${month}/${expYear}`
  } catch {
    return '08/28'
  }
}

export default function LoyaltyCardVisual({
  commerceName,
  logoUrl,
  brandColor,
  pointsBalance,
  clientName,
  cardId,
  createdAt,
  isActive = true,
  businessType,
}: {
  commerceName: string
  logoUrl?: string | null
  brandColor?: string | null
  pointsBalance: number
  clientName: string
  cardId?: string
  createdAt?: string
  isActive?: boolean
  businessType?: string
}) {
  const expDate = formatExpDate(createdAt)
  const maskedCard = cardId ? `${cardId.slice(0, 4)}****` : '5679****'

  return (
    <div
      className="relative aspect-[1.62/1] w-full min-h-[195px] sm:min-h-[220px] overflow-hidden rounded-[26px] sm:rounded-[28px] p-5 sm:p-6 transition-all duration-500 select-none text-white border border-white/10"
      style={{
        background: brandColor
          ? `linear-gradient(135deg, #15183E 0%, #252865 40%, ${brandColor} 90%, #3B2B7E 100%)`
          : 'linear-gradient(135deg, #1C1F4A 0%, #2A2E6D 50%, #44358E 100%)',
        boxShadow: isActive
          ? '0 25px 50px -12px rgba(37, 40, 101, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)'
          : '0 12px 30px -6px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-12 -left-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-[#6366F1]/25 blur-3xl" />

      {/* Geometric Fold / Polygon Watermark Graphic (Matching the Payzz reference photo) */}
      <svg
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 h-48 w-48 opacity-15"
        fill="none"
      >
        <polygon points="100,20 180,65 180,145 100,100" fill="white" opacity="0.4" />
        <polygon points="100,20 20,65 100,100" fill="white" opacity="0.2" />
        <polygon points="100,100 180,145 100,190" fill="white" opacity="0.5" />
        <polygon points="20,65 100,100 100,190 20,135" fill="white" opacity="0.3" />
      </svg>

      {/* Satin sheen overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 55%)',
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Top Row: Pill Badge on Left, Merchant Logo/Brand on Right */}
        <div className="flex items-center justify-between gap-3">
          {/* Pill Badge with commerce name + logo icon */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold text-white/95 backdrop-blur-md border border-white/15 shadow-2xs transition-all max-w-[65%]">
            {logoUrl && (
              <img
                src={logoUrl}
                alt=""
                className="h-4 w-4 rounded-full object-cover bg-white shrink-0 shadow-2xs"
              />
            )}
            <span className="truncate">{commerceName || 'Carte de fidélité'}</span>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="shrink-0 opacity-80"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>

          {/* Prominent Merchant Logo (Matching photo position with high contrast white frame) */}
          <div className="shrink-0 flex items-center gap-2">
            {logoUrl ? (
              <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-white p-1 shadow-md border border-white/30 flex items-center justify-center overflow-hidden">
                <img
                  src={logoUrl}
                  alt={commerceName}
                  className="h-full w-full object-contain rounded-xl"
                />
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white font-bold text-sm shadow-xs border border-white/25">
                  {commerceName ? commerceName.charAt(0).toUpperCase() : 'L'}
                </div>
                <span className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-white/90 tracking-tight hidden xs:inline">
                  {commerceName ? `${commerceName}.` : 'Loyniva.'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row: Current Balance on Left, Exp & Card on Right */}
        <div className="flex items-end justify-between gap-4 pt-4">
          {/* Left: Current Balance */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/70">
              Solde actuel
            </p>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                {pointsBalance.toLocaleString()}
              </span>
              <span className="text-sm sm:text-base font-bold text-white/80">pts</span>
            </div>
            <p className="text-[10px] text-white/60 font-medium tracking-wide mt-0.5 truncate max-w-[170px]">
              {clientName.toUpperCase()}
            </p>
          </div>

          {/* Right: Exp. & Card metadata columns */}
          <div className="flex items-center gap-4 sm:gap-6 text-right shrink-0">
            {/* Column 1: Exp. */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/60">
                Exp.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 font-mono">
                {expDate}
              </p>
            </div>

            {/* Column 2: Card */}
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/60">
                Card
              </p>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 font-mono tracking-wider">
                {maskedCard}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
