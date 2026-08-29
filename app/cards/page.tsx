import { getClient, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import WalletStack from '@/components/WalletStack'

type Transaction = {
  id: string
  type: 'credit' | 'debit'
  pointsDelta: number
  amountFcfa: number | null
  createdAt: string
  commerceName: string
}

function formatRelative(dateStr: string) {
  const date = new Date(dateStr)
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000)
  if (diffDays <= 0) return "Aujourd'hui"
  if (diffDays === 1) return 'Hier'
  return `Il y a ${diffDays} j`
}

function txLabel(tx: Transaction) {
  if (tx.type === 'credit') {
    return tx.amountFcfa ? `Achat ${tx.amountFcfa.toLocaleString()} FCFA` : 'Bonus'
  }
  return 'Récompense échangée'
}

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
      <div className="rounded-3xl border-2 border-dashed border-border-subtle bg-surface p-8 sm:p-12 text-center shadow-sm mt-4">
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
    )
  }

  const totalPoints = cards.reduce((sum: number, c: any) => sum + (c.pointsBalance || 0), 0)

  const txResults = await Promise.all(
    cards.map((c: any) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/me/cards/${c.id}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }).then((r) => (r.ok ? r.json() : []))
    )
  )

  const transactions: Transaction[] = txResults
    .flatMap((txs: any[], i: number) =>
      txs.map((tx: any) => ({
        ...tx,
        commerceName: cards[i].commerce?.name || cards[i].restaurant?.name || '',
      }))
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6)

  return (
    <div className="space-y-7">
      <div className="pt-2 text-center">
        <p className="mb-1.5 text-xs uppercase tracking-wide text-text-muted">Total de points</p>
        <p className="font-[family-name:var(--font-display)] text-[42px] font-medium leading-none tracking-tight text-foreground">
          {totalPoints.toLocaleString()}
        </p>
        <p className="mt-1 text-xs text-text-muted">sur toutes vos cartes</p>
      </div>

      <WalletStack cards={cards} clientName={client.name} />

      <div className="grid grid-cols-3 gap-3">
        <Link
          href={`/cards/${cards[0].id}#code`}
          className="flex flex-col items-center gap-2 rounded-2xl border border-border-subtle bg-surface-muted py-3.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ background: 'rgba(37,99,235,0.15)' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </span>
          <span className="text-xs text-text-muted">Saisir code</span>
        </Link>

        <Link
          href={`/cards/${cards[0].id}#rewards`}
          className="flex flex-col items-center gap-2 rounded-2xl border border-border-subtle bg-surface-muted py-3.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ background: 'rgba(249,115,22,0.15)' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8">
              <rect x="3" y="8" width="18" height="13" rx="2" />
              <path d="M3 12h18M12 8v13" />
              <path d="M12 8c-1.5 0-3-1-3-2.5S10.5 3 12 4c1.5-1 3-.5 3 1S13.5 8 12 8Z" />
            </svg>
          </span>
          <span className="text-xs text-text-muted">Récompenses</span>
        </Link>

        <Link
          href="/join"
          className="flex flex-col items-center gap-2 rounded-2xl border border-border-subtle bg-surface-muted py-3.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ background: 'rgba(74,222,128,0.15)' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.8">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-xs text-text-muted">Rejoindre</span>
        </Link>
      </div>

      {transactions.length > 0 && (
        <div>
          <p className="mb-3.5 text-xs font-medium uppercase tracking-wide text-text-muted">Historique récent</p>
          <div className="flex flex-col">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 border-b border-border-subtle py-3 last:border-0">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: tx.type === 'credit' ? 'rgba(37,99,235,0.15)' : 'rgba(249,115,22,0.15)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tx.type === 'credit' ? '#60a5fa' : '#f97316'} strokeWidth="1.8">
                    {tx.type === 'credit' ? (
                      <circle cx="12" cy="12" r="8" />
                    ) : (
                      <path d="M20 12V8H6a2 2 0 0 1 0-4h12v4M4 6v12a2 2 0 0 0 2 2h14v-4" />
                    )}
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground">{tx.commerceName}</p>
                  <p className="mt-0.5 text-xs text-text-muted">
                    {txLabel(tx)} · {formatRelative(tx.createdAt)}
                  </p>
                </div>
                <p className={`shrink-0 text-sm font-medium ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.type === 'credit' ? '+' : '-'}
                  {Math.abs(tx.pointsDelta)} pts
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
