'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Card = {
  id: string
  pointsBalance: number
  commerce?: {
    id: string
    name: string
    logoUrl?: string | null
    brandColor?: string | null
    businessType?: string | null
  }
  restaurant?: {
    id: string
    name: string
    logoUrl?: string | null
    brandColor?: string | null
    businessType?: string | null
  }
}

// Preset luxury card gradient styles (Card 0 matches the lilac metallic card in the reference photo!)
const CARD_THEMES = [
  {
    // Lilac / Lavender Metallic (Exact match to reference photo!)
    bg: 'linear-gradient(135deg, #DDD6FE 0%, #C4B5FD 45%, #9333EA 100%)',
    overlay: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)',
    textColor: 'text-white',
    subColor: 'text-purple-100',
    chipColor: '#FDE047',
    badgeBg: 'bg-white/25 text-white',
    shadow: 'shadow-purple-500/20',
  },
  {
    // Deep Ocean Sapphire
    bg: 'linear-gradient(135deg, #93C5FD 0%, #3B82F6 45%, #1E3A8A 100%)',
    overlay: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)',
    textColor: 'text-white',
    subColor: 'text-blue-100',
    chipColor: '#FDE047',
    badgeBg: 'bg-white/25 text-white',
    shadow: 'shadow-blue-500/20',
  },
  {
    // Emerald Luxury
    bg: 'linear-gradient(135deg, #A7F3D0 0%, #10B981 45%, #064E3B 100%)',
    overlay: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)',
    textColor: 'text-white',
    subColor: 'text-emerald-100',
    chipColor: '#FDE047',
    badgeBg: 'bg-white/25 text-white',
    shadow: 'shadow-emerald-500/20',
  },
  {
    // Sunset Coral
    bg: 'linear-gradient(135deg, #FED7AA 0%, #F97316 45%, #9A3412 100%)',
    overlay: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)',
    textColor: 'text-white',
    subColor: 'text-orange-100',
    chipColor: '#FDE047',
    badgeBg: 'bg-white/25 text-white',
    shadow: 'shadow-orange-500/20',
  },
  {
    // Platinum Titanium
    bg: 'linear-gradient(135deg, #CBD5E1 0%, #64748B 45%, #0F172A 100%)',
    overlay: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)',
    textColor: 'text-white',
    subColor: 'text-slate-200',
    chipColor: '#FDE047',
    badgeBg: 'bg-white/25 text-white',
    shadow: 'shadow-slate-500/20',
  },
]

export default function WalletStack({
  cards,
  clientName,
  totalPoints: initialTotalPoints,
}: {
  cards: Card[]
  clientName: string
  totalPoints?: number
}) {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMasked, setIsMasked] = useState(false)
  const [showCardPoints, setShowCardPoints] = useState(false)
  const [isElevated, setIsElevated] = useState(false)

  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const isDragging = useRef<boolean>(false)

  if (cards.length === 0) return null

  const activeCard = cards[activeIndex] || cards[0]
  const totalPoints =
    typeof initialTotalPoints === 'number'
      ? initialTotalPoints
      : cards.reduce((sum, c) => sum + (c.pointsBalance || 0), 0)

  const displayedPoints = showCardPoints ? activeCard.pointsBalance || 0 : totalPoints

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isDragging.current = false
  }

  function handleTouchMove(e: React.TouchEvent) {
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current)
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current)
    if (dx > dy && dx > 15) {
      isDragging.current = true
    }
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (isDragging.current) {
      if (dx < -40) {
        // Swipe left -> next card
        setActiveIndex((prev) => (prev + 1) % cards.length)
      } else if (dx > 40) {
        // Swipe right -> prev card
        setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
      }
    }
  }

  function cycleNextCard() {
    setActiveIndex((prev) => (prev + 1) % cards.length)
  }

  return (
    <div className="w-full space-y-6">
      {/* ============================================================== */}
      {/* 1. PHYSICAL POCKET WALLET CONTAINER                            */}
      {/* ============================================================== */}
      <div
        className="relative mx-auto w-full max-w-sm select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Glow behind the wallet */}
        <div className="pointer-events-none absolute -inset-2 rounded-[36px] bg-gradient-to-b from-[#6366F1]/20 via-[#4F35E8]/25 to-transparent blur-2xl" />

        <div className="relative h-[340px] w-full overflow-hidden rounded-[32px] pt-4">
          {/* ========================================================== */}
          {/* A. CARDS STACK INSIDE THE POCKET (SLOTTED IN)              */}
          {/* ========================================================== */}
          <div className="relative h-full w-full">
            {cards.map((card, index) => {
              // Calculate stack position relative to active card
              const total = cards.length
              // Normalized distance: 0 = active, 1 = behind 1, 2 = behind 2...
              const diff = (index - activeIndex + total) % total
              const isActive = diff === 0

              // Only show active and up to 2 cards layered behind for realistic depth
              if (diff > 2 && diff < total - 1) return null

              const theme = CARD_THEMES[index % CARD_THEMES.length]
              const commerceName = card.commerce?.name || card.restaurant?.name || 'Commerce Fidélité'
              const logoUrl = card.commerce?.logoUrl || card.restaurant?.logoUrl
              const businessType = card.commerce?.businessType || card.restaurant?.businessType || 'Fidélité'

              // Card stack offset & styling
              let translateY = 18 // Default position for active card peeking out
              let scale = 1
              let zIndex = 15
              let opacity = 1
              let brightness = 'brightness(1)'

              if (isActive) {
                translateY = isElevated ? -15 : 18
                scale = 1
                zIndex = 16
                opacity = 1
                brightness = 'brightness(1)'
              } else if (diff === 1 || diff === total - 1) {
                // First card behind
                translateY = 4
                scale = 0.94
                zIndex = 14
                opacity = 0.95
                brightness = 'brightness(0.92)'
              } else if (diff === 2) {
                // Second card behind
                translateY = -8
                scale = 0.88
                zIndex = 13
                opacity = 0.85
                brightness = 'brightness(0.85)'
              }

              return (
                <div
                  key={card.id}
                  onClick={() => {
                    if (isDragging.current) return
                    if (isActive) {
                      // Click active card -> toggle elevated or open card
                      if (!isElevated) {
                        setIsElevated(true)
                      } else {
                        router.push(`/cards/${card.id}`)
                      }
                    } else {
                      setActiveIndex(index)
                      setIsElevated(false)
                    }
                  }}
                  className="absolute inset-x-3 transition-all duration-500 ease-out cursor-pointer"
                  style={{
                    top: 0,
                    height: 200,
                    zIndex,
                    opacity,
                    filter: brightness,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    transformOrigin: 'top center',
                  }}
                >
                  {/* The Physical Card Body */}
                  <div
                    className="relative h-full w-full rounded-[22px] p-5 shadow-2xl overflow-hidden border border-white/20 transition-transform duration-300 active:scale-[0.99]"
                    style={{ background: theme.bg }}
                  >
                    {/* Satin shine overlay */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ background: theme.overlay }}
                    />

                    {/* Subtle noise/texture */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `radial-gradient(circle at 80% 20%, white 0%, transparent 60%)`,
                      }}
                    />

                    {/* Card Content (Top ~60% visible above pocket mouth) */}
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      {/* Top Row: Name on Left, Logo/Brand on Right */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold tracking-tight text-white drop-shadow-sm truncate">
                            {commerceName}
                          </p>
                          <p className="font-mono text-[11px] tracking-widest text-white/80 mt-0.5">
                            •••• •••• •••• {card.id.slice(-4)}
                          </p>
                        </div>

                        {/* Logo or Loyalty Badge */}
                        <div className="shrink-0 flex items-center gap-1.5">
                          {logoUrl ? (
                            <img
                              src={logoUrl}
                              alt={commerceName}
                              className="h-9 w-9 rounded-xl object-cover bg-white/20 p-0.5 shadow-sm border border-white/30"
                            />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 font-bold text-white shadow-sm border border-white/30 text-sm">
                              {commerceName.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Middle Row: Gold Chip & Contactless Wave + Points */}
                      <div className="flex items-center justify-between pt-1">
                        {/* EMV Gold Chip Icon */}
                        <div className="flex items-center gap-2">
                          <div className="relative h-6 w-8 rounded-md bg-gradient-to-tr from-amber-300 via-amber-200 to-yellow-400 p-0.5 shadow-xs border border-amber-400/60">
                            <div className="h-full w-full rounded-xs border border-amber-500/40 grid grid-cols-2 gap-0.5 opacity-60">
                              <div className="border-r border-amber-600/30" />
                              <div />
                            </div>
                          </div>
                          {/* NFC Wave */}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-75">
                            <path d="M4 10a12 12 0 0 1 16 0" />
                            <path d="M7 14a8 8 0 0 1 10 0" />
                            <path d="M10 18a4 4 0 0 1 4 0" />
                          </svg>
                        </div>

                        {/* Status / Points Badge */}
                        <div className="rounded-full bg-black/20 px-2.5 py-0.5 text-[11px] font-semibold text-white/95 backdrop-blur-xs border border-white/15">
                          {card.pointsBalance.toLocaleString()} pts
                        </div>
                      </div>

                      {/* Bottom Row: Titulaire & Action */}
                      <div className="flex items-end justify-between pt-2 border-t border-white/15 text-[10px]">
                        <div>
                          <p className="text-white/70 uppercase tracking-wider text-[9px]">Titulaire</p>
                          <p className="font-semibold text-white tracking-wide truncate max-w-[160px]">
                            {clientName.toUpperCase()}
                          </p>
                        </div>
                        <span className="text-white/80 font-medium underline underline-offset-2 flex items-center gap-1">
                          Voir détails
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ========================================================== */}
          {/* B. THE FRONT POCKET POUCH (COVERS THE CARDS' LOWER HALF)   */}
          {/* ========================================================== */}
          <div className="absolute inset-x-0 bottom-0 h-[215px] z-20 pointer-events-auto">
            {/* SVG Pocket Pouch with Dipped Top Lip & Stitched Seam */}
            <svg
              viewBox="0 0 400 220"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full drop-shadow-[0_-8px_16px_rgba(0,0,0,0.25)]"
            >
              <defs>
                <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5538EE" />
                  <stop offset="50%" stopColor="#462EE0" />
                  <stop offset="100%" stopColor="#351DC9" />
                </linearGradient>

                <linearGradient id="pocketSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.24)" />
                  <stop offset="35%" stopColor="rgba(255,255,255,0.06)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
                </linearGradient>
              </defs>

              {/* Main Pocket Body with subtle curved dipped mouth */}
              <path
                d="M 28 0 C 14 0 0 14 0 28 L 0 192 C 0 207 13 220 28 220 L 372 220 C 387 220 400 207 400 192 L 400 28 C 400 14 386 0 372 0 C 295 0 255 18 200 18 C 145 18 105 0 28 0 Z"
                fill="url(#pocketGrad)"
              />

              {/* Top Sheen */}
              <path
                d="M 28 0 C 14 0 0 14 0 28 L 0 192 C 0 207 13 220 28 220 L 372 220 C 387 220 400 207 400 192 L 400 28 C 400 14 386 0 372 0 C 295 0 255 18 200 18 C 145 18 105 0 28 0 Z"
                fill="url(#pocketSheen)"
              />

              {/* Realistic Stitched Seam (Dashed stroke along border and dipped rim) */}
              <path
                d="M 30 10 C 19 10 10 19 10 30 L 10 188 C 10 199 19 209 30 209 L 370 209 C 381 209 390 199 390 188 L 390 30 C 390 19 381 10 370 10 C 293 10 253 27 200 27 C 147 27 107 10 30 10 Z"
                fill="none"
                stroke="rgba(224, 215, 255, 0.48)"
                strokeWidth="2"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />
            </svg>

            {/* Content on the Pocket Front Face */}
            <div className="relative z-10 flex h-full flex-col justify-between p-6 pt-9 text-white">
              {/* Balance Header */}
              <div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowCardPoints(!showCardPoints)}
                    className="flex items-center gap-1.5 text-xs font-medium text-white/75 hover:text-white transition-colors"
                  >
                    <span>{showCardPoints ? 'Solde de la carte' : 'Total de points'}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  <span className="text-[11px] font-medium text-white/70">
                    {activeIndex + 1} / {cards.length}
                  </span>
                </div>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-sm">
                    {isMasked ? '•••• ••••' : displayedPoints.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-white/80">pts</span>
                </div>
              </div>

              {/* Bottom Action Row (Matching reference photo!) */}
              <div className="flex items-center justify-between pt-2">
                {/* Pill Button: + Add / Redeem */}
                <Link
                  href={`/cards/${activeCard.id}#code`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 px-4 py-2 text-xs font-semibold text-white shadow-xs backdrop-blur-md transition-all duration-200"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                  <span>Saisir un code</span>
                </Link>

                {/* Right utility buttons */}
                <div className="flex items-center gap-2">
                  {/* Swap / Switch Card button */}
                  <button
                    onClick={cycleNextCard}
                    title="Changer de carte"
                    aria-label="Passer à la carte suivante"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 active:scale-90 text-white shadow-xs backdrop-blur-md transition-all"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m16 3 4 4-4 4" />
                      <path d="M20 7H4" />
                      <path d="m8 21-4-4 4-4" />
                      <path d="M4 17h16" />
                    </svg>
                  </button>

                  {/* Mask/Unmask Balance Eye button */}
                  <button
                    onClick={() => setIsMasked(!isMasked)}
                    title={isMasked ? 'Afficher le solde' : 'Masquer le solde'}
                    aria-label="Masquer ou afficher le solde"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 active:scale-90 text-white shadow-xs backdrop-blur-md transition-all"
                  >
                    {isMasked ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" y1="2" x2="22" y2="22" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. "MES COMMERCES" (QUICK CARD SWITCHER - LIKE IN PHOTO)       */}
      {/* ============================================================== */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-foreground">
            Mes commerces
          </h2>
          <Link
            href="/join"
            className="text-xs font-medium text-accent hover:underline flex items-center gap-1"
          >
            <span>+ Rejoindre</span>
          </Link>
        </div>

        {/* Horizontal scroll of merchant avatars */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
          {/* Add commerce button */}
          <Link
            href="/join"
            className="flex flex-col items-center gap-1.5 shrink-0 group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-border-subtle bg-surface-muted group-hover:border-accent group-hover:bg-surface-subtle transition-all active:scale-95">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted group-hover:text-accent">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[11px] font-medium text-text-muted group-hover:text-foreground">
              Ajouter
            </span>
          </Link>

          {/* Commerce avatar pills */}
          {cards.map((card, idx) => {
            const isSelected = idx === activeIndex
            const commerceName = card.commerce?.name || card.restaurant?.name || 'Commerce'
            const logoUrl = card.commerce?.logoUrl || card.restaurant?.logoUrl
            const theme = CARD_THEMES[idx % CARD_THEMES.length]

            return (
              <button
                key={card.id}
                onClick={() => {
                  setActiveIndex(idx)
                  setIsElevated(false)
                }}
                className="flex flex-col items-center gap-1.5 shrink-0 transition-transform active:scale-95"
              >
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'ring-3 ring-[#4F35E8] ring-offset-2 ring-offset-background scale-105 shadow-md'
                      : 'opacity-70 hover:opacity-100 hover:scale-102'
                  }`}
                  style={{
                    background: theme.bg,
                  }}
                >
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={commerceName}
                      className="h-full w-full rounded-full object-cover p-1"
                    />
                  ) : (
                    <span className="text-base font-bold text-white">
                      {commerceName.charAt(0)}
                    </span>
                  )}

                  {/* Active dot indicator */}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#16845B] text-[9px] text-white font-bold ring-2 ring-background">
                      ✓
                    </span>
                  )}
                </div>

                <span
                  className={`text-[11px] font-medium max-w-[64px] truncate text-center ${
                    isSelected ? 'font-semibold text-foreground' : 'text-text-muted'
                  }`}
                >
                  {commerceName}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. ACTIVE CARD QUICK SHORTCUTS                                */}
      {/* ============================================================== */}
      <div className="grid grid-cols-3 gap-2.5">
        <Link
          href={`/cards/${activeCard.id}`}
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-border-subtle bg-surface-muted py-3 px-2 text-center transition-all hover:bg-surface-subtle hover:border-[#4F35E8]/30 active:scale-98 shadow-2xs"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4F35E8]/10 text-[#4F35E8]">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </span>
          <span className="text-xs font-medium text-foreground">Présenter QR</span>
        </Link>

        <Link
          href={`/cards/${activeCard.id}#code`}
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-border-subtle bg-surface-muted py-3 px-2 text-center transition-all hover:bg-surface-subtle hover:border-accent/30 active:scale-98 shadow-2xs"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 11-1 9" />
              <path d="m19 11-4-7" />
              <path d="M2 11h20" />
              <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.6-7.4" />
              <path d="m4.5 15.5 15-5" />
            </svg>
          </span>
          <span className="text-xs font-medium text-foreground">Saisir code</span>
        </Link>

        <Link
          href={`/cards/${activeCard.id}#rewards`}
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-border-subtle bg-surface-muted py-3 px-2 text-center transition-all hover:bg-surface-subtle hover:border-amber-500/30 active:scale-98 shadow-2xs"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="8" width="18" height="13" rx="2" />
              <path d="M3 12h18M12 8v13" />
              <path d="M12 8c-1.5 0-3-1-3-2.5S10.5 3 12 4c1.5-1 3-.5 3 1S13.5 8 12 8Z" />
            </svg>
          </span>
          <span className="text-xs font-medium text-foreground">Récompenses</span>
        </Link>
      </div>
    </div>
  )
}
