'use client'

import { useState } from 'react'

const TYPE_LABELS: Record<string, string> = {
  campaign: 'Annonce',
  birthday: 'Anniversaire',
  inactivity_reminder: 'On vous a manqué',
  vip_status: 'Statut VIP',
  first_purchase: 'Bienvenue',
}

export default function NotificationsList({
  cardId,
  initialNotifications,
  brandColor,
}: {
  cardId: string
  initialNotifications: any[]
  brandColor: string
}) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [expanded, setExpanded] = useState(false)

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const visibleNotifications = expanded ? notifications : notifications.slice(0, 3)

  async function markRead(notificationId: string) {
    setNotifications(notifications.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)))
    await fetch(`/api/loyalty-cards/${cardId}/notifications/${notificationId}/read`, { method: 'PATCH' })
  }

  if (notifications.length === 0) return null

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-display)] text-base font-semibold text-stone-900">
          Notifications
        </h2>
        {unreadCount > 0 && (
          <span
            className="rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: `${brandColor}1A`, color: brandColor }}
          >
            {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="mt-3 space-y-2">
        {visibleNotifications.map((n) => (
          <button
            key={n.id}
            onClick={() => !n.isRead && markRead(n.id)}
            className={`block w-full rounded-lg p-3 text-left ${n.isRead ? 'bg-stone-50' : 'bg-amber-50'}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-500">{TYPE_LABELS[n.type] || n.type}</span>
              <span className="text-xs text-stone-400">
                {new Date(n.createdAt).toLocaleDateString('fr-FR')}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-stone-900">{n.title}</p>
            <p className="text-sm text-stone-500">{n.message}</p>
          </button>
        ))}
      </div>

      {notifications.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm font-medium text-stone-500"
        >
          {expanded ? 'Voir moins' : `Voir tout (${notifications.length})`}
        </button>
      )}
    </div>
  )
}
