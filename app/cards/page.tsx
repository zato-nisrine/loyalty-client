import { getClient, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import WalletStack from '@/components/WalletStack'

export default async function CardsPage() {
  const client = await getClient()
  if (!client) redirect('/login')

  const token = await getToken()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/me/cards`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  const cards = res.ok ? await res.json() : []

  const totalPoints = cards.reduce((sum: number, c: any) => sum + (c.pointsBalance || 0), 0)
  const cardCount = cards.length

  return (
    <div className="space-y-6">
      {cards.length === 0 && (
        <div className="rounded-3xl border-2 border-dashed border-border-subtle bg-surface p-8 sm:p-12 text-center shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-surface-muted flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C2410C" strokeWidth="1.5">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </div>
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-semibold text-foreground mb-2">
            Aucune carte de fidélité
          </h3>
          <p className="text-sm text-text-muted mb-6">
            Scannez le QR code d'un commerce pour rejoindre son programme de fidélité
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Rejoindre un commerce
          </Link>
        </div>
      )}

      {cards.length > 0 && (
        <>
          {/* Balance summary, CRED-style */}
          <div className="px-1">
            <p className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              {totalPoints.toLocaleString()} <span className="text-lg font-semibold text-text-muted">pts</span>
            </p>
            <p className="mt-1 text-sm text-text-muted">
              répartis sur {cardCount} carte{cardCount > 1 ? 's' : ''} de fidélité
            </p>
          </div>

          {/* Quick action icons */}
          <div className="flex items-center gap-6 px-1">
            <Link href="/join" className="flex flex-col items-center gap-2">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted border border-border-subtle text-foreground">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 12h10" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-xs font-medium text-text-muted">Scanner</span>
            </Link>

            <a href="#wallet-stack" className="flex flex-col items-center gap-2">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted border border-border-subtle text-foreground">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="2" y="6" width="20" height="14" rx="2.5" />
                  <path d="M2 10.5h20" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-xs font-medium text-text-muted">Mes cartes</span>
            </a>

            <Link href="/join" className="flex flex-col items-center gap-2">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted border border-border-subtle text-foreground">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-xs font-medium text-text-muted">Ajouter</span>
            </Link>
          </div>

          <div id="wallet-stack">
            <WalletStack cards={cards} clientName={client.name} />
          </div>
        </>
      )}
    </div>
  )
}
