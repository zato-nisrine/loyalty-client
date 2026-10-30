'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import LoynivaLogo from './LoynivaLogo'
import ThemeToggle from './ThemeToggle'
import { useInstallPwa } from './InstallPwaContext'

export default function ClientNavbar({
  clientName,
  cardCount,
}: {
  clientName: string
  cardCount: number
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { promptInstall, isStandalone, isInstalled } = useInstallPwa()

  const initials =
    clientName
      .trim()
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'C'

  // Prevent background scrolling when sidebar is open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const navLinks = [
    {
      href: '/cards',
      label: 'Mes cartes',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="3" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
    },
    {
      href: '/join',
      label: 'Rejoindre un commerce',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border-subtle bg-surface/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {/* Burger Button */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu de navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-surface-muted text-foreground transition-all hover:bg-surface-subtle active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M3 5H17M3 10H17M3 15H17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Link href="/cards" className="flex items-center gap-2">
            <LoynivaLogo size="sm" showTagline={false} />
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Install Button if not standalone */}
          {!isStandalone && !isInstalled && (
            <button
              onClick={promptInstall}
              title="Ajouter l'application sur votre écran"
              className="flex items-center gap-1.5 rounded-xl border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-xs font-bold text-accent transition-all hover:bg-accent/20 active:scale-95"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="hidden xs:inline">Installer</span>
            </button>
          )}

          <ThemeToggle />

          {/* User initials chip */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Profil"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#102A43] text-xs font-bold text-white shadow-xs transition-transform hover:scale-105 active:scale-95 dark:bg-[#4F9DCE] dark:text-[#091420]"
          >
            {initials}
          </button>
        </div>
      </header>

      {/* Slide-out Sidebar Drawer */}
      {open && (
        <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#102A43]/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Sidebar Drawer */}
          <aside className="fixed inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col justify-between border-r border-border-subtle bg-surface p-5 shadow-2xl transition-transform duration-300 ease-out">
            <div className="flex-1 overflow-y-auto">
              {/* Header */}
              <div className="mb-5 flex items-center justify-between border-b border-border-subtle pb-4">
                <Link href="/cards" onClick={() => setOpen(false)}>
                  <LoynivaLogo size="sm" showTagline={false} />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle text-foreground hover:bg-surface-muted transition-colors active:scale-95"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 1L13 13M1 13L13 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Client Profile Card */}
              <div className="mb-5 flex items-center gap-3 rounded-xl border border-border-subtle bg-surface-muted p-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-sm font-bold text-white shadow-xs dark:bg-[#4F9DCE] dark:text-[#091420]">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold text-foreground">
                    {clientName}
                  </p>
                  <p className="text-[11px] font-medium text-accent">
                    {cardCount} carte{cardCount > 1 ? 's' : ''} active{cardCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navLinks.map((link) => {
                  const active =
                    pathname === link.href ||
                    (link.href === '/cards' && pathname.startsWith('/cards/'))

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-[#102A43] text-white shadow-xs dark:bg-[#4F9DCE] dark:text-[#091420]'
                          : 'text-text-main hover:bg-surface-muted hover:text-foreground'
                      }`}
                    >
                      <span className={active ? 'text-white dark:text-[#091420]' : 'text-text-muted'}>
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  )
                })}

                {/* Install App Item */}
                <button
                  onClick={() => {
                    setOpen(false)
                    promptInstall()
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-text-main transition-colors hover:bg-surface-muted hover:text-foreground"
                >
                  <span className="text-accent">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </span>
                  <span>Installer sur l'écran</span>
                  <span className="ml-auto rounded-md bg-accent/15 px-1.5 py-0.5 text-[10px] font-extrabold text-accent">PWA</span>
                </button>

                <Link
                  href="/installer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-medium text-text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
                >
                  <span className="text-text-muted">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </span>
                  <span>Guide d'installation</span>
                </Link>
              </nav>
            </div>

            {/* Bottom Actions & Footer */}
            <div className="mt-4 border-t border-border-subtle pt-4 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-medium text-text-muted">Apparence</span>
                <ThemeToggle />
              </div>

              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface px-3 py-2 text-sm font-semibold text-text-main transition-colors hover:border-[#C43D4D] hover:bg-[#C43D4D]/5 hover:text-[#C43D4D]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>

              <p className="text-[11px] text-center text-text-muted">
                LOYNIVA — Chaque visite compte.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
