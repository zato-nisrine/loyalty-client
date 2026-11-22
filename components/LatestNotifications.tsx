'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export type ClientNotification = {
  id: string
  loyaltyCardId: string
  type: 'campaign' | 'birthday' | 'inactivity_reminder' | 'vip_status' | 'first_purchase'
  title: string
  message: string
  bonusPoints: number | null
  isRead: boolean
  createdAt: string
  loyaltyCard?: {
    id: string
    restaurant?: {
      id: string
      name: string
      logoUrl: string | null
      brandColor: string | null
    }
  }
}

export type ClientTransaction = {
  id: string
  type: 'credit' | 'debit'
  pointsDelta: number
  amountFcfa: number | null
  createdAt: string
  commerceName: string
  commerceLogoUrl?: string | null
}

const TYPE_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; icon: string }
> = {
  campaign: {
    label: 'Annonce',
    bg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    icon: '📢',
  },
  birthday: {
    label: 'Anniversaire',
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    text: 'text-purple-600 dark:text-purple-400',
    icon: '🎂',
  },
  inactivity_reminder: {
    label: 'On vous a manqué',
    bg: 'bg-teal-500/10 dark:bg-teal-500/20',
    text: 'text-teal-600 dark:text-teal-400',
    icon: '👋',
  },
  vip_status: {
    label: 'Statut VIP',
    bg: 'bg-amber-500/10 dark:bg-amber-500/20',
    text: 'text-amber-600 dark:text-amber-400',
    icon: '⭐',
  },
  first_purchase: {
    label: 'Bienvenue',
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    icon: '🎉',
  },
}

function formatRelative(dateStr: string) {
  const date = new Date(dateStr)
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000)
  if (diffDays <= 0) return "Aujourd'hui"
  if (diffDays === 1) return 'Hier'
  return `Il y a ${diffDays} j`
}

function txLabel(tx: ClientTransaction) {
  if (tx.type === 'credit') {
    return tx.amountFcfa ? `Achat ${tx.amountFcfa.toLocaleString()} FCFA` : 'Bonus'
  }
  return 'Récompense'
}

export default function LatestNotifications({
  initialNotifications,
  transactions,
}: {
  initialNotifications: ClientNotification[]
  transactions: ClientTransaction[]
}) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [tab, setTab] = useState<'notifications' | 'transactions'>('notifications')

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const handleMarkRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' })
    } catch (e) {
      // Ignorer
    }
  }

  return (
    <div className="space-y-3 pt-2">
      {/* Header with Compact Switcher Tabs (Anti-collision mobile) */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="inline-flex items-center gap-1 rounded-xl bg-surface-muted p-1 border border-border-subtle shrink-0">
          <button
            onClick={() => setTab('notifications')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs transition-all ${
              tab === 'notifications'
                ? 'bg-surface text-foreground font-bold shadow-2xs'
                : 'text-text-muted hover:text-foreground font-medium'
            }`}
          >
            <span>Notifications</span>
            {unreadCount > 0 ? (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#4F35E8] px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            ) : notifications.length > 0 ? (
              <span className="text-[10px] text-text-muted">({notifications.length})</span>
            ) : null}
          </button>

          {transactions.length > 0 && (
            <button
              onClick={() => setTab('transactions')}
              className={`flex items-center gap-1 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs transition-all ${
                tab === 'transactions'
                  ? 'bg-surface text-foreground font-bold shadow-2xs'
                  : 'text-text-muted hover:text-foreground font-medium'
              }`}
            >
              <span>Transactions</span>
              <span className="text-[10px] text-text-muted">({transactions.length})</span>
            </button>
          )}
        </div>

        <span className="text-[11px] text-text-muted truncate text-right">
          {tab === 'notifications'
            ? unreadCount > 0
              ? `${unreadCount} non lue${unreadCount > 1 ? 's' : ''}`
              : 'À jour'
            : `${transactions.length} récentes`}
        </span>
      </div>

      {/* 1. Notifications & Messages d'annonces */}
      {tab === 'notifications' && (
        <div className="space-y-2.5">
          {notifications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border-subtle bg-surface-muted/40 p-6 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-text-muted">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-foreground">
                Aucune notification pour le moment
              </p>
              <p className="mt-0.5 text-[11px] text-text-muted">
                Les annonces, offres et bonus de vos commerces s'afficheront ici.
              </p>
            </div>
          ) : (
            notifications.map((notif) => {
              const commerce = notif.loyaltyCard?.restaurant
              const commerceName = commerce?.name || 'Votre commerce'
              const logoUrl = commerce?.logoUrl
              const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.campaign

              return (
                <Link
                  key={notif.id}
                  href={`/cards/${notif.loyaltyCardId}`}
                  onClick={() => !notif.isRead && handleMarkRead(notif.id)}
                  className={`group relative flex items-start gap-3 rounded-2xl border p-3.5 transition-all active:scale-[0.99] ${
                    notif.isRead
                      ? 'border-border-subtle bg-surface hover:bg-surface-muted'
                      : 'border-indigo-500/30 bg-gradient-to-r from-indigo-500/[0.04] via-surface to-surface shadow-xs hover:border-indigo-500/50'
                  }`}
                >
                  {/* Pastille non lue */}
                  {!notif.isRead && (
                    <span className="absolute top-3.5 right-3 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                    </span>
                  )}

                  {/* Logo / Avatar du commerce */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted border border-border-subtle overflow-hidden shadow-2xs">
                    {logoUrl ? (
                      <div className="h-full w-full bg-white p-1 flex items-center justify-center">
                        <img
                          src={logoUrl}
                          alt={commerceName}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : (
                      <span className="font-bold text-xs text-foreground">
                        {commerceName.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Contenu de la notification */}
                  <div className="min-w-0 flex-1 pr-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-xs text-foreground truncate max-w-[130px] sm:max-w-none">
                        {commerceName}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${config.bg} ${config.text} shrink-0`}
                      >
                        <span>{config.icon}</span>
                        <span>{config.label}</span>
                      </span>
                      <span className="text-[10px] text-text-muted ml-auto shrink-0">
                        {formatRelative(notif.createdAt)}
                      </span>
                    </div>

                    <p className="font-bold text-xs text-foreground mt-1 leading-snug">
                      {notif.title}
                    </p>
                    <p className="text-[11px] text-text-muted mt-0.5 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>

                    {notif.bonusPoints && notif.bonusPoints > 0 && (
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        <span>+ {notif.bonusPoints} points offerts !</span>
                      </div>
                    )}
                  </div>
                </Link>
              )
            })
          )}
        </div>
      )}

      {/* 2. Transactions horizontales */}
      {tab === 'transactions' && (
        <div className="flex items-stretch gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
          {transactions.map((tx) => {
            const isCredit = tx.type === 'credit'
            return (
              <div
                key={tx.id}
                className="flex min-w-[140px] max-w-[170px] shrink-0 flex-col justify-between rounded-2xl border border-border-subtle bg-surface-muted/80 p-3.5 shadow-2xs hover:bg-surface-subtle transition-all"
              >
                <div className="space-y-2">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold shadow-2xs overflow-hidden"
                    style={{
                      background: isCredit ? 'rgba(74, 222, 128, 0.15)' : 'rgba(249, 115, 22, 0.15)',
                      color: isCredit ? '#16845B' : '#EA580C',
                    }}
                  >
                    {tx.commerceLogoUrl ? (
                      <div className="h-full w-full bg-white p-1 flex items-center justify-center">
                        <img
                          src={tx.commerceLogoUrl}
                          alt={tx.commerceName}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : (
                      tx.commerceName.charAt(0)
                    )}
                  </div>

                  <div>
                    <p className="truncate text-xs font-semibold text-foreground">
                      {tx.commerceName}
                    </p>
                    <p className="text-[10px] text-text-muted truncate mt-0.5">
                      {txLabel(tx)} • {formatRelative(tx.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-border-subtle/50">
                  <p
                    className={`font-semibold text-xs ${
                      isCredit ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                    }`}
                  >
                    {isCredit ? '+' : '-'}
                    {Math.abs(tx.pointsDelta)} pts
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

