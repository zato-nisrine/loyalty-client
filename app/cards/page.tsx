import { getClient, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import WalletStack from '@/components/WalletStack'
import InstallBanner from '@/components/InstallBanner'
import NotificationBanner from '@/components/NotificationBanner'
import LatestNotifications, { ClientTransaction } from '@/components/LatestNotifications'

export default async function CardsPage() {
  const client = await getClient()
  if (!client) redirect('/login')

  const token = await getToken()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/me/cards`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  const cards = res.ok ? await res.json() : []

  if (cards.length === 0) {
    return (
      <div className="space-y-4 mt-2">
        <InstallBanner />
        <NotificationBanner />
        <div className="rounded-3xl border-2 border-dashed border-border-subtle bg-surface p-8 sm:p-12 text-center shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-surface-muted flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4F9DCE" strokeWidth="1.5">
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
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F35E8] to-[#6366F1] px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Rejoindre un commerce
          </Link>
        </div>
      </div>
    )
  }

  const totalPoints = cards.reduce((sum: number, c: any) => sum + (c.pointsBalance || 0), 0)

  const [notifRes, txResults] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/me/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }).catch(() => null),
    Promise.all(
      cards.map((c: any) =>
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/me/cards/${c.id}/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        }).then((r) => (r.ok ? r.json() : []))
      )
    ),
  ])

  const notifications = notifRes && notifRes.ok ? (await notifRes.json()).slice(0, 5) : []

  const transactions: ClientTransaction[] = txResults
    .flatMap((txs: any[], i: number) =>
      txs.map((tx: any) => ({
        ...tx,
        commerceName: cards[i].commerce?.name || cards[i].restaurant?.name || 'Commerce',
        commerceLogoUrl: cards[i].commerce?.logoUrl || cards[i].restaurant?.logoUrl,
      }))
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* PWA Install Banner */}
      <InstallBanner />

      {/* Push Notification Banner */}
      <NotificationBanner />

      {/* Header (Wallet / Portefeuille title matching reference photo) */}
      <div className="flex items-center justify-between px-1 pt-1">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-foreground">
            Portefeuille
          </h1>
          <p className="text-xs text-text-muted">
            Mes cartes & notifications
          </p>
        </div>
        <Link
          href="/join"
          aria-label="Rejoindre un nouveau commerce"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface text-foreground shadow-xs hover:bg-surface-muted transition-all active:scale-95"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </Link>
      </div>

      {/* Physical Pocket Wallet & Card switcher */}
      <WalletStack cards={cards} clientName={client.name} totalPoints={totalPoints} />

      {/* Latest Notifications (Annonces, Offres, etc.) & Transactions */}
      <LatestNotifications
        initialNotifications={notifications}
        transactions={transactions}
      />
    </div>
  )
}
