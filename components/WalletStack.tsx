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

  const ROTATION_STEP = 9
  const SCALE_STEP = 0.045

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

  return (
    <div className="w-full select-none py-2">
      <div className="relative w-full" style={{ height: 380 }}>
        {cards.map((card, index) => {
          const distance = index - activeIndex
          const isActive = distance === 0
          const rotation = distance * ROTATION_STEP
          const scale = Math.max(0.8, 1 - Math.abs(distance) * SCALE_STEP)
          const zIndex = isActive ? 50 : cards.length - Math.abs(distance)
          const opacity = Math.max(0.55, 1 - Math.abs(distance) * 0.12)

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
                left: '50%',
                bottom: 0,
                width: '62%',
                maxWidth: 220,
                zIndex,
                opacity,
                transform: `translateX(-50%) rotate(${rotation}deg) scale(${scale})`,
                transformOrigin: 'bottom center',
                transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
                touchAction: 'pan-y',
              }}
            >
              <LoyaltyCardVisual
                commerceName={card.commerce?.name || card.restaurant?.name || ''}
                logoUrl={card.commerce?.logoUrl || card.restaurant?.logoUrl}
                brandColor={card.commerce?.brandColor || card.restaurant?.brandColor || '#C2410C'}
                businessType={card.commerce?.businessType || card.restaurant?.businessType}
                pointsBalance={card.pointsBalance}
                clientName={clientName}
                isActive={isActive}
              />
            </div>
          )
        })}
      </div>

      {cards.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: index === activeIndex ? 20 : 6,
                backgroundColor: index === activeIndex ? 'var(--foreground)' : 'var(--border-subtle)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
