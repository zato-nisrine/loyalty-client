import { getClient, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LoyaltyCardVisual from '@/components/LoyaltyCardVisual'

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
    <div className="space-y-4">
      {cards.length === 0 && (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-8 text-center">
          <p className="text-sm text-stone-500">Vous n'avez pas encore de carte de fidélité</p>
          <Link
            href="/join"
            className="mt-4 inline-block rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white"
          >
            Rejoindre un restaurant
          </Link>
        </div>
      )}

      {cards.map((card: any) => (
        <Link key={card.id} href={`/cards/${card.id}`} className="block">
          <LoyaltyCardVisual
            restaurantName={card.restaurant.name}
            logoUrl={card.restaurant.logoUrl}
            brandColor={card.restaurant.brandColor}
            pointsBalance={card.pointsBalance}
            clientName={client.name}
          />
        </Link>
      ))}

      {cards.length > 0 && (
        <Link
          href="/join"
          className="block rounded-2xl border border-dashed border-stone-300 bg-white p-4 text-center text-sm font-medium text-stone-600"
        >
          + Rejoindre un autre restaurant
        </Link>
      )}
    </div>
  )
}
