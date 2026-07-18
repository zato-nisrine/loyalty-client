import { getClient, getToken } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import LoyaltyCardVisual from '@/components/LoyaltyCardVisual'
import CodeRedeemForm from '@/components/CodeRedeemForm'
import RewardsList from '@/components/RewardsList'
import NotificationsList from '@/components/NotificationsList'

export default async function CardDetailPage({ params }: { params: Promise<{ cardId: string }> }) {
  const client = await getClient()
  if (!client) redirect('/login')

  const { cardId } = await params
  const token = await getToken()

  const [cardRes, rulesRes, notificationsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/loyalty-cards/${cardId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/loyalty-cards/${cardId}/reward-rules`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/loyalty-cards/${cardId}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }),
  ])

  if (!cardRes.ok) notFound()
  const card = await cardRes.json()
  const rules = rulesRes.ok ? await rulesRes.json() : []
  const notifications = notificationsRes.ok ? await notificationsRes.json() : []

  return (
    <div className="space-y-6">
      <LoyaltyCardVisual
        commerceName={card.restaurant.name}
        logoUrl={card.restaurant.logoUrl}
        brandColor={card.restaurant.brandColor}
        pointsBalance={card.pointsBalance}
        clientName={client.name}
      />

      <NotificationsList cardId={card.id} initialNotifications={notifications} brandColor={card.restaurant.brandColor} />

      <CodeRedeemForm cardId={card.id} brandColor={card.restaurant.brandColor} />

      <RewardsList
        cardId={card.id}
        rules={rules}
        pointsBalance={card.pointsBalance}
        brandColor={card.restaurant.brandColor}
      />
    </div>
  )
}
