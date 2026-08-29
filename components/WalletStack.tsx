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

  const FAN_X = 22
  const FAN_Y = 10
  const FAN_ROTATION = 6
  const CARD_SCALE = 0.94

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

  const cardHeight = 210
  const maxSpread = (cards.length - 1) * FAN_Y + 24
  const totalHeight = cardHeight + maxSpread

  return (
    <div className="w-full select-none py-2">
      <div
        style={{ height: totalHeight, position: 'relative' }}
        className="w-full mx-auto max-w-md"
      >
        {cards.map((card, index) => {
          const isActive = index === activeIndex
          const distance = index - activeIndex

          let translateX, translateY, rotation, scale, zIndex, opacity

          if (isActive) {
            translateX = 0
            translateY = 0
            rotation = 0
            scale = 1
            zIndex = 50
            opacity = 1
          } else {
            const behindCount = distance < 0 ? cards.length + distance : distance
            translateX = distance < 0 ? -FAN_X * Math.abs(distance) : FAN_X * distance
            translateY = FAN_Y * Math.abs(distance) + 6
            rotation = distance < 0 ? -FAN_ROTATION : FAN_ROTATION
            scale = CARD_SCALE
            zIndex = cards.length - Math.abs(distance)
            opacity = Math.max(0.4, 0.85 - Math.abs(distance) * 0.15)
          }

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
                top: 0,
                left: 0,
                right: 0,
                zIndex,
                transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
                transformOrigin: 'bottom center',
                transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer',
                touchAction: 'pan-y',
                opacity,
              }}
            >
              <LoyaltyCardVisual
                commerceName={card.commerce?.name || card.restaurant?.name || ''}
                logoUrl={card.commerce?.logoUrl || card.restaurant?.logoUrl}
                brandColor={card.commerce?.brandColor || card.restaurant?.brandColor || '#C2410C'}
                pointsBalance={card.pointsBalance}
                clientName={clientName}
                isActive={isActive}
              />
            </div>
          )
        })}
      </div>

      {cards.length > 1 && (
        <div className="mt-5 flex justify-center gap-2">
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
