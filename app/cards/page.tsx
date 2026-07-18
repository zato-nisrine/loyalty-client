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
    <div className="space-y-6">
      {cards.length === 0 && (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
          <p className="text-sm text-stone-500">Vous n'avez pas encore de carte de fidélité</p>
          <Link
            href="/join"
            className="mt-4 inline-block rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white"
          >
            Rejoindre un commerce
          </Link>
        </div>
      )}

      {cards.length > 0 && (
        <>
          <WalletStack cards={cards} clientName={client.name} />
          <p className="text-center text-xs text-stone-400">
            Appuyez sur une carte pour la sélectionner, puis de nouveau pour l'ouvrir
          </p>
          <Link
            href="/join"
            className="block rounded-2xl border border-dashed border-stone-300 bg-white p-4 text-center text-sm font-medium text-stone-600"
          >
            + Rejoindre un autre commerce
          </Link>
        </>
      )}
    </div>
  )
}
