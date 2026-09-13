'use client'

type IconDef = { path: React.ReactNode; top: string; left: string; size: number; rotate: number; duration: number; delay: number }

function getBusinessIcons(businessType?: string): IconDef[] {
  const configs: Record<string, React.ReactNode[]> = {
    restaurant: [
      // burger
      <path key="1" d="M4 11h16a1 1 0 0 1 1 1 1 1 0 0 1-1 1H4a1 1 0 0 1-1-1 1 1 0 0 1 1-1ZM3 15h18M6 8c0-2.5 2.5-4.5 6-4.5S18 5.5 18 8" strokeLinecap="round" />,
      // fries cup
      <path key="2" d="M6 9h12l-1.5 11a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1L6 9ZM9 9V5M12 9V4M15 9V5" strokeLinecap="round" />,
      // drink cup
      <path key="3" d="M7 8h10l-1 12a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1L7 8ZM6 8h12M12 8V4M10 4h4" strokeLinecap="round" />,
    ],
    coiffeur: [
      // scissors
      <path key="1" d="M6 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7.5 9.5 19 20M7.5 14.5 19 4" strokeLinecap="round" />,
      // comb
      <path key="2" d="M4 6h16v3H4zM6 9v9M9 9v9M12 9v9M15 9v9M18 9v9" strokeLinecap="round" />,
      // spray bottle
      <path key="3" d="M10 22h4V11h-4v11ZM9 11h6l-1-3h-4l-1 3ZM11 8V5h3M14 5l2-2" strokeLinecap="round" />,
    ],
    tailleur: [
      // needle + thread
      <path key="1" d="M4 20 15 9a2.5 2.5 0 0 0-3.5-3.5L4 12M4 20l3-1-2-2-1 3Z" strokeLinecap="round" />,
      // scissors (fabric)
      <path key="2" d="M6 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM6 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7.5 9.5 19 20M7.5 14.5 19 4" strokeLinecap="round" />,
      // spool of thread
      <path key="3" d="M8 4h8v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4V4ZM8 20h8v-4a4 4 0 0 0-4-4 4 4 0 0 0-4 4v4Z" strokeLinecap="round" />,
    ],
    lavage: [
      // water droplet
      <path key="1" d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" strokeLinecap="round" />,
      // sponge
      <path key="2" d="M4 9h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9ZM7 12h.01M11 12h.01M15 12h.01" strokeLinecap="round" />,
      // bubbles
      <path key="3" d="M8 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />,
    ],
    pressing: [
      // iron
      <path key="1" d="M4 18h13l3-5-3-6H8a4 4 0 0 0-4 4v7ZM4 18v2h13v-2" strokeLinecap="round" />,
      // hanger
      <path key="2" d="M12 4a2 2 0 1 1 2 2l-2 2 9 5.5H3L12 8Z" strokeLinecap="round" />,
      // shirt
      <path key="3" d="M8 4 4 7l2 3 2-1v11h8V9l2 1 2-3-4-3-2 2h-2L8 4Z" strokeLinecap="round" />,
    ],
    autre: [
      <path key="1" d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" strokeLinecap="round" />,
      <path key="2" d="M12 2 14 9 21 12 14 15 12 22 10 15 3 12 10 9Z" strokeLinecap="round" strokeLinejoin="round" />,
      <path key="3" d="M12 3 15 9 21 9 16 13 18 20 12 16 6 20 8 13 3 9 9 9Z" strokeLinecap="round" strokeLinejoin="round" />,
    ],
  }

  const paths = configs[businessType || 'autre'] || configs.autre
  const positions = [
    { top: '8%', left: '68%', size: 46, rotate: -12, duration: 7, delay: 0 },
    { top: '55%', left: '82%', size: 34, rotate: 18, duration: 8.5, delay: 1.2 },
    { top: '72%', left: '10%', size: 40, rotate: 8, duration: 6.5, delay: 0.6 },
  ]

  return paths.map((path, i) => ({ path, ...positions[i] }))
}

export default function LoyaltyCardVisual({
  commerceName,
  logoUrl,
  brandColor,
  pointsBalance,
  clientName,
  isActive = true,
  businessType,
}: {
  commerceName: string
  logoUrl?: string | null
  brandColor: string
  pointsBalance: number
  clientName: string
  isActive?: boolean
  businessType?: string
}) {
  const color = brandColor || '#C2410C'
  const icons = getBusinessIcons(businessType)

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

      {icons.map((icon, i) => (
        <svg
          key={i}
          className="card-bg-icon absolute opacity-[0.14] blur-[0.5px]"
          style={{
            top: icon.top,
            left: icon.left,
            width: icon.size,
            height: icon.size,
            '--icon-rot': `${icon.rotate}deg`,
            '--icon-duration': `${icon.duration}s`,
            '--icon-delay': `${icon.delay}s`,
          } as React.CSSProperties}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.3"
        >
          {icon.path}
        </svg>
      ))}

      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="absolute inset-0 rounded-[22px] border border-white/10" />

      <div className="relative z-10 flex h-full flex-col justify-between">
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

        <div className="space-y-1">
          <p className="font-[family-name:var(--font-display)] text-base font-bold text-white tracking-tight truncate">
            {commerceName}
          </p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Carte de fidélité</p>
        </div>

        <div>
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-1">Solde</p>
          <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-white tracking-tight truncate">
            {pointsBalance.toLocaleString()} <span className="text-xs font-semibold text-gray-400">pts</span>
          </p>
        </div>

        <div>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest">Titulaire</p>
          <p className="text-[11px] font-semibold text-white tracking-wide truncate">{clientName.toUpperCase()}</p>
        </div>
      </div>
    </div>
  )
}
