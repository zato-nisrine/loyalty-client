'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import LoynivaLogo from '@/components/LoynivaLogo'
import ThemeToggle from '@/components/ThemeToggle'
import { useInstallPwa, DevicePlatform } from '@/components/InstallPwaContext'

export default function InstallerPage() {
  const { promptInstall, canPrompt, platform, isInAppBrowser, isStandalone, isInstalled } = useInstallPwa()
  const [activeTab, setActiveTab] = useState<DevicePlatform>('ios')

  useEffect(() => {
    if (platform === 'ios' || platform === 'android' || platform === 'desktop') {
      setActiveTab(platform)
    }
  }, [platform])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border-subtle bg-surface/90 px-4 py-3 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/cards"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle bg-surface-muted text-text-main transition-colors hover:bg-surface-subtle"
            aria-label="Retour"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <Link href="/">
            <LoynivaLogo size="sm" showTagline={false} />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:px-6">
        {/* Hero Section */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#102A43] to-[#245078] text-white shadow-xl dark:from-[#4F9DCE] dark:to-[#173859] dark:text-[#091420]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>

          <h1 className="mt-5 font-display text-2xl font-black tracking-tight sm:text-3xl text-foreground">
            Installez LOYNIVA sur votre écran
          </h1>
          <p className="mx-auto mt-2.5 max-w-lg text-sm text-text-muted leading-relaxed">
            Profitez de votre porte-cartes fidélité instantanément, sans téléchargement lourd depuis l'App Store ou Google Play.
          </p>

          {/* Status Badge */}
          {isStandalone || isInstalled ? (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Application déjà installée sur votre écran</span>
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={promptInstall}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[#102A43] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#102A43]/20 transition-all hover:bg-[#1A3E61] hover:scale-105 active:scale-95 dark:bg-[#4F9DCE] dark:text-[#091420] dark:shadow-[#4F9DCE]/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Ajouter à mon écran maintenant</span>
              </button>

              <Link
                href="/cards"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-border-subtle bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
              >
                Accéder à mes cartes
              </Link>
            </div>
          )}
        </div>

        {/* In-App Browser Warning */}
        {isInAppBrowser && (
          <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-900 dark:text-amber-200">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="font-bold text-sm">Navigateur interne détecté (Instagram, TikTok, WhatsApp...)</p>
                <p className="mt-1 leading-relaxed">
                  Les navigateurs intégrés aux réseaux sociaux empêchent l'installation directe. Pour installer l'application, touchez le bouton <strong>Options (⋮ ou Partager)</strong> et sélectionnez <strong>« Ouvrir dans le navigateur »</strong> (Safari ou Chrome).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Grid */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border-subtle bg-surface p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h2 className="mt-3 font-display text-xs font-bold text-foreground">Accès instantané</h2>
            <p className="mt-1 text-[11px] text-text-muted">Un tapotement suffit pour ouvrir vos cartes en caisse.</p>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-surface p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            </div>
            <h2 className="mt-3 font-display text-xs font-bold text-foreground">0 Mo de stockage</h2>
            <p className="mt-1 text-[11px] text-text-muted">N'encombre pas la mémoire de votre téléphone.</p>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-surface p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <h2 className="mt-3 font-display text-xs font-bold text-foreground">Toujours à jour</h2>
            <p className="mt-1 text-[11px] text-text-muted">Mises à jour transparentes et points en direct.</p>
          </div>
        </div>

        {/* Step-by-Step Instructions by OS */}
        <div className="mt-10 rounded-3xl border border-border-subtle bg-surface p-6 shadow-sm">
          <h2 className="font-display text-lg font-bold text-foreground text-center">
            Guide d'installation pas-à-pas
          </h2>
          <p className="text-center text-xs text-text-muted mt-1">
            Sélectionnez votre appareil pour voir la manipulation exacte :
          </p>

          {/* OS Switcher */}
          <div className="mt-5 flex rounded-xl border border-border-subtle bg-surface-muted p-1">
            <button
              onClick={() => setActiveTab('ios')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${
                activeTab === 'ios'
                  ? 'bg-surface text-foreground shadow-sm'
                  : 'text-text-muted hover:text-foreground'
              }`}
            >
              <span>🍎 iPhone / iPad</span>
            </button>
            <button
              onClick={() => setActiveTab('android')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${
                activeTab === 'android'
                  ? 'bg-surface text-foreground shadow-sm'
                  : 'text-text-muted hover:text-foreground'
              }`}
            >
              <span>🤖 Android</span>
            </button>
            <button
              onClick={() => setActiveTab('desktop')}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${
                activeTab === 'desktop'
                  ? 'bg-surface text-foreground shadow-sm'
                  : 'text-text-muted hover:text-foreground'
              }`}
            >
              <span>💻 PC / Mac</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'ios' && (
              <div className="space-y-4">
                <div className="flex items-start gap-3.5 rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-sm font-bold text-white shadow-xs dark:bg-[#4F9DCE] dark:text-[#091420]">
                    1
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">Ouvrez LOYNIVA dans Safari</p>
                    <p className="text-xs text-text-muted">
                      Touchez l'icône de <strong>Partage</strong> située au centre de la barre inférieure de Safari (ou en haut sur iPad).
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-xs font-semibold text-foreground">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F9DCE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                      </svg>
                      <span>Bouton Partager (carré avec flèche)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-sm font-bold text-white shadow-xs dark:bg-[#4F9DCE] dark:text-[#091420]">
                    2
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">Sélectionnez « Sur l'écran d'accueil »</p>
                    <p className="text-xs text-text-muted">
                      Faites glisser la feuille d'options vers le bas jusqu'à trouver la ligne avec l'icône plus (+).
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-xs font-semibold text-foreground">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4F9DCE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="4" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                      <span>Sur l'écran d'accueil</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-sm font-bold text-white shadow-xs dark:bg-[#4F9DCE] dark:text-[#091420]">
                    3
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">Appuyez sur « Ajouter »</p>
                    <p className="text-xs text-text-muted">
                      Le bouton se trouve dans le coin supérieur droit. L'icône LOYNIVA est maintenant installée sur votre écran d'accueil avec vos autres applications !
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'android' && (
              <div className="space-y-4">
                <div className="flex items-start gap-3.5 rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-sm font-bold text-white shadow-xs dark:bg-[#4F9DCE] dark:text-[#091420]">
                    1
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">Appuyez sur le menu (⋮)</p>
                    <p className="text-xs text-text-muted">
                      Dans Google Chrome ou Samsung Internet, touchez les trois points verticaux en haut à droite.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-sm font-bold text-white shadow-xs dark:bg-[#4F9DCE] dark:text-[#091420]">
                    2
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">Appuyez sur « Installer l'application »</p>
                    <p className="text-xs text-text-muted">
                      (Ou « Ajouter à l'écran d'accueil » selon votre navigateur).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-sm font-bold text-white shadow-xs dark:bg-[#4F9DCE] dark:text-[#091420]">
                    3
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">Confirmez en touchant « Installer »</p>
                    <p className="text-xs text-text-muted">
                      L'application s'ajoute immédiatement à votre tiroir d'applications et à votre écran principal.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'desktop' && (
              <div className="space-y-4">
                <div className="flex items-start gap-3.5 rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-sm font-bold text-white shadow-xs dark:bg-[#4F9DCE] dark:text-[#091420]">
                    1
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">Cliquez sur l'icône dans la barre d'adresse</p>
                    <p className="text-xs text-text-muted">
                      Sur Google Chrome ou Microsoft Edge, un pictogramme d'écran avec une flèche ou un bouton « Installer » s'affiche à droite de la barre d'adresse URL.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-border-subtle bg-surface-muted/50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#102A43] text-sm font-bold text-white shadow-xs dark:bg-[#4F9DCE] dark:text-[#091420]">
                    2
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-foreground">Cliquez sur « Installer »</p>
                    <p className="text-xs text-text-muted">
                      L'application se lance dans sa propre fenêtre séparée et un raccourci est placé sur votre bureau ou barre des tâches.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-10 space-y-3">
          <h2 className="font-display text-base font-bold text-foreground">Questions fréquentes</h2>

          <div className="rounded-2xl border border-border-subtle bg-surface p-4 text-xs leading-relaxed">
            <p className="font-bold text-foreground">Est-ce une vraie application ?</p>
            <p className="mt-1 text-text-muted">
              Oui ! Il s'agit d'une Progressive Web App (PWA). Elle s'ouvre en plein écran sans barre de navigateur, s'intègre à votre système et vous permet d'accéder à vos cartes ultra rapidement.
            </p>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-surface p-4 text-xs leading-relaxed">
            <p className="font-bold text-foreground">Est-ce que c'est payant ?</p>
            <p className="mt-1 text-text-muted">
              Non, l'installation est 100% gratuite et ne nécessite aucun abonnement store.
            </p>
          </div>

          <div className="rounded-2xl border border-border-subtle bg-surface p-4 text-xs leading-relaxed">
            <p className="font-bold text-foreground">Comment la désinstaller si besoin ?</p>
            <p className="mt-1 text-text-muted">
              Exactement comme n'importe quelle application : maintenez votre doigt appuyé sur l'icône sur votre écran d'accueil, puis touchez « Supprimer l'app ».
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-6 text-center text-xs text-text-muted">
        <p>© {new Date().getFullYear()} LOYNIVA. Chaque visite compte.</p>
      </footer>
    </div>
  )
}
