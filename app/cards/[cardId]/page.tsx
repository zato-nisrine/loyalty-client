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
      <div className="mx-auto max-w-[240px]">
        <LoyaltyCardVisual
          commerceName={card.restaurant.name}
          logoUrl={card.restaurant.logoUrl}
          brandColor={card.restaurant.brandColor}
          businessType={card.restaurant.businessType}
          pointsBalance={card.pointsBalance}
          clientName={client.name}
        />
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm">
        <p className="mb-4 text-sm font-medium text-foreground">Votre QR Code unique</p>
        <div className="rounded-xl border-4 border-surface-muted bg-white p-6">
          <QRCode value={card.id} size={220} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} viewBox={`0 0 220 220`} />
        </div>
        <p className="mt-4 text-xs text-text-muted">Présentez ce code au commerçant</p>
      </div>
      <NotificationsList cardId={card.id} initialNotifications={notifications} brandColor={card.restaurant.brandColor} />
      <div id="code" className="scroll-mt-6">
        <CodeRedeemForm cardId={card.id} brandColor={card.restaurant.brandColor} />
      </div>
      <div id="rewards" className="scroll-mt-6">
        <RewardsList
          cardId={card.id}
          rules={rules}
          pointsBalance={card.pointsBalance}
          brandColor={card.restaurant.brandColor}
        />
      </div>
    </div>
  )
}
