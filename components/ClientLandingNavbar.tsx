'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import LoynivaLogo from './LoynivaLogo'
import ThemeToggle from './ThemeToggle'
import { useInstallPwa } from './InstallPwaContext'

interface ClientLandingNavbarProps {
  client: { name: string; email?: string } | null
}

export default function ClientLandingNavbar({ client }: ClientLandingNavbarProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { promptInstall, isStandalone, isInstalled } = useInstallPwa()

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

  const initials = client?.name
    ? client.name
        .trim()
        .split(/\s+/)
        .map((part) => part.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'C'

  return (
    <>
      <header className="flex items-center justify-between py-5 sm:py-6">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <LoynivaLogo size="md" showTagline={true} />
        </Link>

        {/* Desktop Navigation (>= sm) */}
        <div className="hidden sm:flex sm:items-center sm:gap-3">
          {!isStandalone && !isInstalled && (
            <button
              onClick={promptInstall}
              className="flex items-center gap-1.5 rounded-xl border border-accent/30 bg-accent/10 px-3.5 py-2 text-xs font-bold text-accent transition-all hover:bg-accent/20 active:scale-95"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Installer l'app</span>
            </button>
          )}

          <ThemeToggle />

          {client ? (
            <Link
              href="/cards"
              className="flex items-center gap-2 rounded-xl bg-[#102A43] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1A3E61] dark:bg-[#4F9DCE] dark:text-[#091420] dark:hover:bg-[#69B0DC]"
            >
              <span>Mes cartes</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-[#4F9DCE] hover:text-[#4F9DCE]"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-[#102A43] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1A3E61] dark:bg-[#4F9DCE] dark:text-[#091420] dark:hover:bg-[#69B0DC]"
              >
                Créer un compte
              </Link>
            </>
          )}
        </div>

        {/* Mobile Actions & Burger (< sm) */}
        <div className="flex items-center gap-2 sm:hidden">
          {!isStandalone && !isInstalled && (
            <button
              onClick={promptInstall}
              title="Installer sur l'écran"
              className="flex items-center gap-1 rounded-xl border border-accent/30 bg-accent/10 px-2.5 py-1.5 text-xs font-bold text-accent transition-all hover:bg-accent/20 active:scale-95"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Installer</span>
            </button>
          )}

          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-surface text-foreground transition-all hover:bg-surface-muted active:scale-95"
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
        </div>
      </header>

      {/* Mobile Slide-out Menu Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 sm:hidden" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#102A43]/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <aside className="fixed inset-y-0 right-0 flex w-72 max-w-[85vw] flex-col justify-between border-l border-border-subtle bg-surface p-5 shadow-2xl transition-transform duration-300 ease-out">
            <div className="flex-1 overflow-y-auto">
              <div className="mb-6 flex items-center justify-between border-b border-border-subtle pb-4">
                <LoynivaLogo size="sm" showTagline={false} />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle text-foreground transition-colors hover:bg-surface-muted active:scale-95"
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

              {/* Install PWA Button in Mobile Drawer */}
              <div className="mb-4">
                <button
                  onClick={() => {
                    setOpen(false)
                    promptInstall()
                  }}
                  className="flex w-full items-center gap-3 rounded-xl border border-accent/30 bg-accent/10 px-3.5 py-2.5 text-sm font-bold text-accent transition-all hover:bg-accent/20 active:scale-95"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Installer sur l'écran</span>
                  <span className="ml-auto rounded-md bg-accent/20 px-1.5 py-0.5 text-[10px] font-extrabold text-accent">PWA</span>
                </button>
              </div>

              {client ? (
                <>
                  {/* Client Profile Card */}
                  <div className="mb-5 flex items-center gap-3 rounded-xl border border-border-subtle bg-surface-muted p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-sm font-bold text-white shadow-xs dark:bg-[#4F9DCE] dark:text-[#091420]">
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-bold text-foreground">
                        {client.name}
                      </p>
                      <p className="text-[11px] font-medium text-accent">Membre LOYNIVA</p>
                    </div>
                  </div>

                  {/* Nav Links */}
                  <nav className="flex flex-col gap-1.5">
                    <Link
                      href="/cards"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl bg-[#102A43] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors dark:bg-[#4F9DCE] dark:text-[#091420]"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="3" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                      Mes cartes de fidélité
                    </Link>

                    <Link
                      href="/join"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-text-main transition-colors hover:bg-surface-muted hover:text-foreground"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                      Rejoindre un commerce
                    </Link>

                    <Link
                      href="/installer"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-medium text-text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                      Guide d'installation
                    </Link>
                  </nav>
                </>
              ) : (
                <>
                  <p className="mb-5 text-xs text-text-muted">
                    Votre porte-cartes de fidélité digital. Toutes vos récompenses dans votre poche.
                  </p>

                  <nav className="flex flex-col gap-2">
                    <Link
                      href="/"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-text-main transition-colors hover:bg-surface-muted hover:text-foreground"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Accueil
                    </Link>

                    <Link
                      href="/join"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-text-main transition-colors hover:bg-surface-muted hover:text-foreground"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                        <rect x="7" y="7" width="10" height="10" rx="1" />
                      </svg>
                      Scanner un QR Code
                    </Link>

                    <Link
                      href="/installer"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-text-muted hover:text-foreground transition-colors hover:bg-surface-muted"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                      Guide d'installation
                    </Link>

                    <div className="my-2 border-t border-border-subtle" />

                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-[#4F9DCE] hover:text-[#4F9DCE]"
                    >
                      <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Se connecter
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#102A43] px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1A3E61] dark:bg-[#4F9DCE] dark:text-[#091420]"
                    >
                      <span>Créer mon compte</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </nav>
                </>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-border-subtle pt-4">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-xs font-medium text-text-muted">Apparence</span>
                <ThemeToggle />
              </div>

              {client && (
                <button
                  onClick={handleLogout}
                  className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface px-3 py-2 text-sm font-semibold text-text-main transition-colors hover:border-[#C43D4D] hover:bg-[#C43D4D]/5 hover:text-[#C43D4D]"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Déconnexion
                </button>
              )}

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
