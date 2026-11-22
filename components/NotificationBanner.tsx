'use client'

import React, { useState, useEffect } from 'react'
import { useNotification } from './OneSignalProvider'
import { useInstallPwa } from './InstallPwaContext'

export default function NotificationBanner() {
  const { isSupported, permission, isLoading, requestPermission } = useNotification()
  const { platform, isStandalone, promptInstall } = useInstallPwa()
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const isDismissed = localStorage.getItem('loyniva_notif_banner_dismissed') === 'true'
    setDismissed(isDismissed)
  }, [])

  // Si déjà accordé ou ignoré par l'utilisateur, ne rien afficher
  if (dismissed || permission === 'granted' || permission === 'denied') {
    return null
  }

  const handleDismiss = () => {
    localStorage.setItem('loyniva_notif_banner_dismissed', 'true')
    setDismissed(true)
  }

  // Cas spécial iOS : Dans Safari normal, les Web Push exigent d'abord l'ajout à l'écran d'accueil
  const isIOSNotInStandalone = platform === 'ios' && !isStandalone

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-[#4F35E8]/10 via-[#6366F1]/10 to-[#4F35E8]/5 p-4 shadow-xs backdrop-blur-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Bell Icon with badge */}
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F35E8] to-[#6366F1] text-white shadow-xs">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
            </span>
          </div>

          <div className="min-w-0 pr-1">
            <p className="font-display text-xs sm:text-sm font-bold text-foreground">
              {isIOSNotInStandalone ? "Activez les notifications sur iPhone" : "Activez vos notifications mobiles"}
            </p>
            <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed">
              {isIOSNotInStandalone
                ? "Ajoutez d'abord l'app à l'écran d'accueil pour recevoir vos points et alertes en direct."
                : "Recevez vos points après chaque achat et soyez alerté dès qu'une récompense est prête !"}
            </p>

            <div className="mt-2.5 flex items-center gap-2">
              {isIOSNotInStandalone ? (
                <button
                  onClick={promptInstall}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#4F35E8] to-[#6366F1] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-transform hover:scale-105 active:scale-95"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Installer sur iPhone
                </button>
              ) : (
                <button
                  onClick={() => requestPermission()}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#4F35E8] to-[#6366F1] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-transform hover:scale-105 active:scale-95 disabled:opacity-60"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  )}
                  {isLoading ? 'Activation...' : 'Activer les notifications'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          aria-label="Ignorer"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-text-muted hover:bg-surface-muted transition-colors active:scale-95"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

