'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import LoyaltyCardVisual from './LoyaltyCardVisual'

export default function WalletStack({ cards, clientName }: { cards: any[]; clientName: string }) {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const isDragging = useRef<boolean>(false)

  if (cards.length === 0) return null

  const CARD_OFFSET = 48

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isDragging.current = false
  }

  function handleTouchMove(e: React.TouchEvent) {
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current)
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current)
    if (dx > dy && dx > 10) {
      isDragging.current = true
    }
  }

  function handleTouchEnd(e: React.TouchEvent, index: number) {
    const dx = e.changedTouches[0].clientX - touchStartX.current

    if (isDragging.current) {
      if (dx < -50 && activeIndex < cards.length - 1) {
        setActiveIndex(activeIndex + 1)
      } else if (dx > 50 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      }
    } else {
      if (index === activeIndex) {
        router.push(`/cards/${cards[index].id}`)
      } else {
        setActiveIndex(index)
      }
    }
  }

  const totalHeight = 200 + (cards.length - 1) * CARD_OFFSET

  return (
    <div className="w-full select-none">
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
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={(e) => handleTouchEnd(e, index)}
              onClick={() => {
                if (!isDragging.current) {
                  if (index === activeIndex) {
                    router.push(`/cards/${cards[index].id}`)
                  } else {
                    setActiveIndex(index)
                  }
                }
              }}
              style={{
                position: 'absolute',
                top: offset,
                left: 0,
                right: 0,
                zIndex: isActive ? 50 : index,
                transform: isActive ? 'scale(1)' : 'scale(0.97)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                touchAction: 'pan-y',
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

      {cards.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: index === activeIndex ? 20 : 6,
                backgroundColor: index === activeIndex ? '#1C1917' : '#D6D3D1',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
