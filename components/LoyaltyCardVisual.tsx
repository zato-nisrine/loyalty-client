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
  restaurantName,
  logoUrl,
  brandColor,
  pointsBalance,
  clientName,
}: {
  restaurantName: string
  logoUrl?: string | null
  brandColor: string
  pointsBalance: number
  clientName: string
}) {
  const color = brandColor || '#C2410C'
  const darkColor = darken(color, 40)

  return (
    <div
      className="relative aspect-[1.6/1] w-full overflow-hidden rounded-2xl p-6"
      style={{ background: `linear-gradient(135deg, ${color}, ${darkColor})` }}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-14 -left-8 h-36 w-36 rounded-full bg-white/5" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-center gap-2.5">
          {logoUrl ? (
            <img src={logoUrl} alt={restaurantName} className="h-9 w-9 rounded-lg object-cover" />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-sm font-semibold" style={{ color }}>
              {restaurantName.charAt(0)}
            </div>
          )}
          <p className="font-[family-name:var(--font-display)] text-base font-semibold text-white">
            {restaurantName}
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wide text-white/70">Solde de points</p>
          <p className="font-[family-name:var(--font-display)] text-4xl font-semibold text-white">
            {pointsBalance}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <p className="text-sm text-white/85">{clientName}</p>
          <p className="text-[11px] tracking-wide text-white/60">MEMBRE</p>
        </div>
      </div>
    </div>
  )
}
