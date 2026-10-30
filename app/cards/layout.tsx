import { getClient, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import ClientNavbar from '@/components/ClientNavbar'

export default async function CardsLayout({ children }: { children: React.ReactNode }) {
  const client = await getClient()
  if (!client) redirect('/login')

  const token = await getToken()
  const cardsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/me/cards`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  const cardCount = cardsRes.ok ? (await cardsRes.json()).length : 0

  return (
    <div className="min-h-screen bg-background pb-24 text-text-main">
      <ClientNavbar clientName={client.name} cardCount={cardCount} />
      <main className="mx-auto max-w-lg px-4 pt-5 pb-6">{children}</main>
      <BottomNav />
    </div>
  )
}