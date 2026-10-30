'use client'

import React from 'react'
import { useInstallPwa } from './InstallPwaContext'

interface InstallButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'compact' | 'nav'
  label?: string
  showBadge?: boolean
  className?: string
  hideWhenStandalone?: boolean
}

export default function InstallButton({
  variant = 'primary',
  label = "Installer sur l'écran",
  showBadge = true,
  className = '',
  hideWhenStandalone = true,
}: InstallButtonProps) {
  const { promptInstall, isStandalone, isInstalled } = useInstallPwa()

  if (hideWhenStandalone && (isStandalone || isInstalled)) {
    return null
  }

  const icon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )

  if (variant === 'nav') {
    return (
      <button
        onClick={promptInstall}
        className={`flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3.5 py-2 text-xs font-bold text-accent transition-all hover:bg-accent/20 active:scale-95 ${className}`}
      >
        {icon}
        <span>{label}</span>
      </button>
    )
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={promptInstall}
        aria-label={label}
        title={label}
        className={`flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-surface-muted text-accent transition-all hover:bg-surface-subtle active:scale-95 ${className}`}
      >
        {icon}
      </button>
    )
  }

  if (variant === 'outline') {
    return (
      <button
        onClick={promptInstall}
        className={`flex items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-xs font-semibold text-foreground transition-all hover:border-[#4F9DCE] hover:text-[#4F9DCE] active:scale-95 ${className}`}
      >
        {icon}
        <span>{label}</span>
      </button>
    )
  }

  if (variant === 'subtle') {
    return (
      <button
        onClick={promptInstall}
        className={`flex items-center justify-center gap-2 rounded-xl bg-surface-muted px-4 py-2.5 text-xs font-semibold text-text-main transition-all hover:bg-surface-subtle hover:text-foreground active:scale-95 ${className}`}
      >
        {icon}
        <span>{label}</span>
      </button>
    )
  }

  // Primary
  return (
    <button
      onClick={promptInstall}
      className={`flex items-center justify-center gap-2.5 rounded-xl bg-[#102A43] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#1A3E61] hover:shadow-lg active:scale-95 dark:bg-[#4F9DCE] dark:text-[#091420] ${className}`}
    >
      {icon}
      <span>{label}</span>
      {showBadge && (
        <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white dark:bg-black/20 dark:text-[#091420]">
          PWA
        </span>
      )}
    </button>
  )
}
