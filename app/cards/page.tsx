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

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-orange-50/20 to-stone-100">
      <div className="space-y-6 px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-stone-900 mb-2">
            Mes Cartes
          </h1>
          <p className="text-sm text-stone-600">
            {cards.length === 0 
              ? 'Commencez à collectionner vos cartes de fidélité' 
              : `${cards.length} carte${cards.length > 1 ? 's' : ''} de fidélité`}
          </p>
        </div>

        {cards.length === 0 && (
          <div className="rounded-3xl border-2 border-dashed border-stone-300 bg-white/80 backdrop-blur-sm p-12 text-center shadow-sm">
            <div className="mb-6 flex justify-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C2410C" strokeWidth="1.5">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900 mb-2">
              Aucune carte de fidélité
            </h3>
            <p className="text-sm text-stone-500 mb-6">
              Scannez le QR code d'un commerce pour rejoindre son programme de fidélité
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105"
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
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50">
              <WalletStack cards={cards} clientName={client.name} />
            </div>
            
            <div className="flex justify-center">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-dashed border-stone-300 bg-white/80 backdrop-blur-sm px-6 py-4 text-sm font-medium text-stone-700 hover:bg-white hover:border-orange-300 transition-all duration-300 hover:scale-105 shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Ajouter une carte
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
