'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RewardsList({
  cardId,
  rules,
  pointsBalance,
  brandColor,
}: {
  cardId: string
  rules: any[]
  pointsBalance: number
  brandColor: string
}) {
  const router = useRouter()
  const [requesting, setRequesting] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  async function handleRequest(ruleId: string) {
    setRequesting(ruleId)
    setMessage('')

    const res = await fetch('/api/rewards/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loyaltyCardId: cardId, rewardRuleId: ruleId }),
    })

    setRequesting(null)

    if (!res.ok) {
      const data = await res.json()
      setMessage(data.message || 'Erreur lors de la demande')
      return
    }

    setMessage('Demande envoyée, présentez-vous au commerce')
    router.refresh()
  }

  if (rules.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-6 text-center">
        <p className="text-sm text-stone-500">Aucune récompense disponible pour le moment</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h2 className="font-[family-name:var(--font-display)] text-base font-semibold text-stone-900">
        Récompenses disponibles
      </h2>
      {rules.map((rule) => {
        const canAfford = pointsBalance >= rule.pointsRequired
        return (
          <div key={rule.id} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-4">
            <div>
              <p className="text-sm font-medium text-stone-900">{rule.name}</p>
              <p className="text-xs text-stone-500">{rule.rewardDescription}</p>
              <span
                className="mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}
              >
                {rule.pointsRequired} pts
              </span>
            </div>
            <button
              onClick={() => handleRequest(rule.id)}
              disabled={!canAfford || requesting === rule.id}
              className="rounded-full px-4 py-2 text-xs font-medium text-white disabled:opacity-30"
              style={{ backgroundColor: brandColor || '#C2410C' }}
            >
              {requesting === rule.id ? '...' : canAfford ? 'Échanger' : 'Insuffisant'}
            </button>
          </div>
        )
      })}
      {message && <p className="text-sm font-medium text-stone-600">{message}</p>}
    </div>
  )
}
