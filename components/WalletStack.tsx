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

  const CARD_OFFSET = 40
  const CARD_SCALE = 0.95

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

  const cardHeight = 220
  const totalHeight = cardHeight + (cards.length - 1) * CARD_OFFSET

  return (
    <div className="w-full select-none py-4">
      <div 
        style={{ height: totalHeight, position: 'relative' }} 
        className="w-full mx-auto max-w-md"
      >
        {cards.map((card, index) => {
          const isActive = index === activeIndex
          const isBehind = index < activeIndex
          const isAhead = index > activeIndex
          
          let offset, scale, rotation, opacity
          
          if (isActive) {
            offset = activeIndex * CARD_OFFSET
            scale = 1
            rotation = 0
            opacity = 1
          } else if (isBehind) {
            offset = index * CARD_OFFSET
            scale = CARD_SCALE
            rotation = -2
            opacity = 0.7
          } else {
            offset = activeIndex * CARD_OFFSET + (index - activeIndex) * CARD_OFFSET
            scale = CARD_SCALE
            rotation = 2
            opacity = 0.5
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
                top: offset,
                left: 0,
                right: 0,
                zIndex: isActive ? 50 : cards.length - index,
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
              {!isActive && (
                <div 
                  className="absolute inset-0 rounded-3xl bg-black/20 backdrop-blur-sm transition-all duration-300"
                  style={{ opacity: isActive ? 0 : 0.4 }}
                />
              )}
            </div>
          )
        })}
      </div>

      {cards.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="h-2 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                width: index === activeIndex ? 24 : 8,
                backgroundColor: index === activeIndex ? '#1C1917' : '#D6D3D1',
                transform: index === activeIndex ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      )}
      
      <div className="mt-4 text-center">
        <p className="text-xs text-stone-400 animate-pulse">
          {cards.length > 1 ? 'Glissez ou tapez pour naviguer' : 'Tapez pour voir les détails'}
        </p>
      </div>
    </div>
  )
}
