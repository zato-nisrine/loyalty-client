'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoyaltyCardVisual from './LoyaltyCardVisual'

export default function WalletStack({ cards, clientName }: { cards: any[]; clientName: string }) {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)

  if (cards.length === 0) return null

  const CARD_OFFSET = 44
  const totalHeight = 200 + (cards.length - 1) * CARD_OFFSET

  function handleCardClick(index: number) {
    if (index === activeIndex) {
      router.push(`/cards/${cards[index].id}`)
    } else {
      setActiveIndex(index)
    }
  }

  return (
    <div style={{ height: totalHeight, position: 'relative' }} className="w-full">
      {cards.map((card, index) => {
        const isActive = index === activeIndex
        const isBehind = index < activeIndex
        const offset = isBehind
          ? index * CARD_OFFSET
          : activeIndex * CARD_OFFSET + (index - activeIndex) * CARD_OFFSET

        return (
          <div
            key={card.id}
            onClick={() => handleCardClick(index)}
            style={{
              position: 'absolute',
              top: offset,
              left: 0,
              right: 0,
              zIndex: isActive ? 50 : index,
              transform: isActive ? 'scale(1)' : 'scale(0.97)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
          >
            <LoyaltyCardVisual
              commerceName={card.commerce?.name || card.restaurant?.name || ''}
              logoUrl={card.commerce?.logoUrl || card.restaurant?.logoUrl}
              brandColor={card.commerce?.brandColor || card.restaurant?.brandColor || '#C2410C'}
              pointsBalance={card.pointsBalance}
              clientName={clientName}
            />
            {!isActive && (
              <div className="absolute inset-0 rounded-2xl bg-black/10" />
            )}
          </div>
        )
      })}
    </div>
  )
}
