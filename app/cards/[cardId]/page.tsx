import { getClient, getToken } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import LoyaltyCardVisual from '@/components/LoyaltyCardVisual'
import CodeRedeemForm from '@/components/CodeRedeemForm'
import RewardsList from '@/components/RewardsList'
import NotificationsList from '@/components/NotificationsList'
import QRCode from 'react-qr-code'

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

      <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm font-medium text-stone-700">Votre QR Code unique</p>
        <div className="rounded-xl border-4 border-stone-100 p-2">
          <QRCode value={card.id} size={160} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} viewBox={`0 0 160 160`} />
        </div>
        <p className="mt-4 text-xs text-stone-400">Présentez ce code au commerçant</p>
      </div>

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
