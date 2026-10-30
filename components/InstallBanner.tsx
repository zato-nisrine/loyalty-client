'use client'

import React, { useState, useEffect } from 'react'
import { useInstallPwa } from './InstallPwaContext'

export default function InstallBanner() {
  const { promptInstall, isStandalone, isInstalled } = useInstallPwa()
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    const isDismissed = localStorage.getItem('loyniva_install_banner_dismissed') === 'true'
    setDismissed(isDismissed)
  }, [])

  if (isStandalone || isInstalled || dismissed) {
    return null
  }

  const handleDismiss = () => {
    localStorage.setItem('loyniva_install_banner_dismissed', 'true')
    setDismissed(true)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-r from-[#102A43]/5 via-[#4F9DCE]/10 to-[#102A43]/5 p-4 dark:from-[#4F9DCE]/10 dark:via-[#102A43]/20 dark:to-[#4F9DCE]/10">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-white shadow-xs dark:bg-[#4F9DCE] dark:text-[#091420]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="font-display text-xs sm:text-sm font-bold text-foreground">
              Ajoutez LOYNIVA sur votre écran
            </p>
            <p className="text-[11px] text-text-muted truncate">
              Vos cartes accessibles en 1 tap en caisse
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={promptInstall}
            className="rounded-xl bg-[#102A43] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-transform hover:scale-105 active:scale-95 dark:bg-[#4F9DCE] dark:text-[#091420]"
          >
            Installer
          </button>
          <button
            onClick={handleDismiss}
            aria-label="Ignorer"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-text-muted hover:bg-surface-muted transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
