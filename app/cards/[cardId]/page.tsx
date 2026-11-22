import { getClient, getToken } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import LoyaltyCardVisual from '@/components/LoyaltyCardVisual'
import CodeRedeemForm from '@/components/CodeRedeemForm'
import RewardsList from '@/components/RewardsList'
import DeleteCardButton from '@/components/DeleteCardButton'
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

  const commerceName = card.restaurant?.name || card.commerce?.name || 'Commerce'
  const logoUrl = card.restaurant?.logoUrl || card.commerce?.logoUrl
  const brandColor = card.restaurant?.brandColor || card.commerce?.brandColor
  const businessType = card.restaurant?.businessType || card.commerce?.businessType

  return (
    <div className="space-y-6">
      {/* Top Header with Back Button and Merchant Logo Badge */}
      <div className="flex items-center justify-between px-1">
        <a
          href="/cards"
          className="inline-flex items-center gap-1.5 rounded-xl border border-border-subtle bg-surface px-3 py-1.5 text-xs font-semibold text-foreground shadow-2xs hover:bg-surface-muted transition-all active:scale-95"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Portefeuille</span>
        </a>

        {/* Merchant Identity Badge */}
        <div className="flex items-center gap-2">
          {logoUrl ? (
            <div className="h-8 w-8 rounded-xl bg-white p-0.5 shadow-2xs border border-border-subtle flex items-center justify-center overflow-hidden">
              <img src={logoUrl} alt={commerceName} className="h-full w-full object-contain rounded-lg" />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface-muted font-bold text-xs text-foreground border border-border-subtle">
              {commerceName.charAt(0)}
            </div>
          )}
          <span className="text-xs font-bold text-foreground truncate max-w-[150px]">
            {commerceName}
          </span>
        </div>
      </div>

      {/* Main Enterprise Loyalty Card (Horizontal Payzz Style with Prominent Logo) */}
      <div className="mx-auto w-full max-w-sm sm:max-w-md">
        <LoyaltyCardVisual
          cardId={card.id}
          createdAt={card.createdAt}
          commerceName={commerceName}
          logoUrl={logoUrl}
          brandColor={brandColor}
          businessType={businessType}
          pointsBalance={card.pointsBalance}
          clientName={client.name}
        />
      </div>

      {/* QR Code Presentation Block with Merchant Brand Banner */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          {logoUrl ? (
            <div className="h-9 w-9 rounded-xl bg-white p-0.5 shadow-2xs border border-border-subtle flex items-center justify-center overflow-hidden">
              <img src={logoUrl} alt={commerceName} className="h-full w-full object-contain rounded-lg" />
            </div>
          ) : null}
          <div>
            <p className="text-sm font-bold text-foreground">Votre QR Code unique</p>
            <p className="text-xs text-text-muted">Chez {commerceName}</p>
          </div>
        </div>

        <div className="rounded-xl border-4 border-surface-muted bg-white p-6 shadow-xs">
          <QRCode value={card.id} size={220} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} viewBox={`0 0 220 220`} />
        </div>
        <p className="mt-4 text-xs text-text-muted text-center">Présentez ce code au commerçant pour cumuler vos points</p>
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
      <DeleteCardButton cardId={card.id} />
    </div>
  )
}
