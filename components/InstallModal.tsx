'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useInstallPwa, DevicePlatform } from './InstallPwaContext'

export default function InstallModal() {
  const { isModalOpen, closeModal, platform, isInAppBrowser, canPrompt, promptInstall } = useInstallPwa()
  const [activeTab, setActiveTab] = useState<DevicePlatform>('ios')

  useEffect(() => {
    if (platform === 'ios' || platform === 'android' || platform === 'desktop') {
      setActiveTab(platform)
    } else {
      setActiveTab('ios')
    }
  }, [platform])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#091420]/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal Card / Bottom Sheet */}
      <div className="relative w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-border-subtle bg-surface p-6 shadow-2xl transition-all duration-300 ease-out max-h-[92vh] overflow-y-auto">
        {/* Drag handle on mobile */}
        <div className="mx-auto -mt-2 mb-4 h-1.5 w-12 rounded-full bg-border-subtle sm:hidden" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#102A43] text-white shadow-md dark:bg-[#4F9DCE] dark:text-[#091420]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Ajouter LOYNIVA sur votre écran
              </h3>
              <p className="text-xs text-text-muted">
                Accès instantané, sans passer par les stores
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            aria-label="Fermer"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-border-subtle text-text-muted hover:bg-surface-muted hover:text-foreground transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* In-App Browser Warning (Instagram, TikTok, etc.) */}
        {isInAppBrowser && (
          <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-800 dark:text-amber-200">
            <div className="flex items-start gap-2.5">
              <span className="text-base">⚠️</span>
              <div className="space-y-1">
                <p className="font-bold">Navigateur interne détecté</p>
                <p className="leading-relaxed">
                  Pour pouvoir ajouter l'application sur votre écran, appuyez sur les <strong>3 points (...)</strong> ou le bouton de partage et sélectionnez <strong>« Ouvrir dans Safari »</strong> ou <strong>« Ouvrir dans Chrome »</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Direct Install Button if supported by current browser (Android / Chrome) */}
        {canPrompt && (
          <div className="mt-4">
            <button
              onClick={promptInstall}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#102A43] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-[#4F9DCE] dark:text-[#091420]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Installer directement en 1 clic</span>
            </button>
            <p className="mt-2 text-center text-[11px] text-text-muted">
              Ou suivez les instructions manuelles ci-dessous :
            </p>
          </div>
        )}

        {/* Platform Tabs */}
        <div className="mt-5 flex rounded-xl border border-border-subtle bg-surface-muted p-1">
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
              activeTab === 'ios'
                ? 'bg-surface text-foreground shadow-xs'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            <span>iPhone / iPad</span>
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
              activeTab === 'android'
                ? 'bg-surface text-foreground shadow-xs'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            <span>Android</span>
          </button>
          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
              activeTab === 'desktop'
                ? 'bg-surface text-foreground shadow-xs'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            <span>PC / Mac</span>
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="mt-5 space-y-4">
          {activeTab === 'ios' && (
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-muted/60 p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#4F9DCE]/15 text-accent font-bold text-sm">
                  1
                </div>
                <div className="flex-1 text-xs leading-relaxed text-text-main">
                  <p className="font-semibold text-foreground">Appuyez sur le bouton Partager</p>
                  <p className="mt-0.5 text-text-muted">
                    Situé dans la barre en bas de Safari (ou en haut sur iPad).
                  </p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4F9DCE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                    <span>Icône carré avec flèche vers le haut</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-muted/60 p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#4F9DCE]/15 text-accent font-bold text-sm">
                  2
                </div>
                <div className="flex-1 text-xs leading-relaxed text-text-main">
                  <p className="font-semibold text-foreground">Sélectionnez « Sur l'écran d'accueil »</p>
                  <p className="mt-0.5 text-text-muted">
                    Faites défiler le menu vers le bas pour trouver l'option.
                  </p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4F9DCE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    <span>Sur l'écran d'accueil</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-muted/60 p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#4F9DCE]/15 text-accent font-bold text-sm">
                  3
                </div>
                <div className="flex-1 text-xs leading-relaxed text-text-main">
                  <p className="font-semibold text-foreground">Touchez « Ajouter »</p>
                  <p className="mt-0.5 text-text-muted">
                    En haut à droite de l'écran. L'icône LOYNIVA apparaîtra sur votre écran d'accueil !
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'android' && (
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-muted/60 p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#4F9DCE]/15 text-accent font-bold text-sm">
                  1
                </div>
                <div className="flex-1 text-xs leading-relaxed text-text-main">
                  <p className="font-semibold text-foreground">Ouvrez le menu de Chrome</p>
                  <p className="mt-0.5 text-text-muted">
                    Appuyez sur les 3 points verticaux en haut à droite du navigateur.
                  </p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F9DCE" strokeWidth="2.5">
                      <circle cx="12" cy="5" r="1.5" fill="#4F9DCE" />
                      <circle cx="12" cy="12" r="1.5" fill="#4F9DCE" />
                      <circle cx="12" cy="19" r="1.5" fill="#4F9DCE" />
                    </svg>
                    <span>Menu (⋮)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-muted/60 p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#4F9DCE]/15 text-accent font-bold text-sm">
                  2
                </div>
                <div className="flex-1 text-xs leading-relaxed text-text-main">
                  <p className="font-semibold text-foreground">Choisissez « Installer l'application »</p>
                  <p className="mt-0.5 text-text-muted">
                    Ou « Ajouter à l'écran d'accueil » selon votre version d'Android.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-muted/60 p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#4F9DCE]/15 text-accent font-bold text-sm">
                  3
                </div>
                <div className="flex-1 text-xs leading-relaxed text-text-main">
                  <p className="font-semibold text-foreground">Confirmez l'installation</p>
                  <p className="mt-0.5 text-text-muted">
                    L'application se lance en plein écran avec une icône dédiée dans vos applications.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'desktop' && (
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-muted/60 p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#4F9DCE]/15 text-accent font-bold text-sm">
                  1
                </div>
                <div className="flex-1 text-xs leading-relaxed text-text-main">
                  <p className="font-semibold text-foreground">Repérez l'icône dans la barre d'adresse</p>
                  <p className="mt-0.5 text-text-muted">
                    Sur Chrome ou Edge, une petite icône d'installation apparaît à droite de l'URL.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-surface-muted/60 p-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#4F9DCE]/15 text-accent font-bold text-sm">
                  2
                </div>
                <div className="flex-1 text-xs leading-relaxed text-text-main">
                  <p className="font-semibold text-foreground">Cliquez sur « Installer »</p>
                  <p className="mt-0.5 text-text-muted">
                    L'application s'ouvre dans une fenêtre autonome et un raccourci est créé.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex flex-col gap-2.5 pt-4 border-t border-border-subtle">
          <Link
            href="/installer"
            onClick={closeModal}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold text-accent hover:underline"
          >
            <span>Voir le tutoriel et les explications détaillées</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <button
            onClick={closeModal}
            className="w-full rounded-xl border border-border-subtle bg-surface-muted py-2.5 text-xs font-semibold text-text-main hover:bg-surface-subtle transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
