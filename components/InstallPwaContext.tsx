'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

export type DevicePlatform = 'ios' | 'android' | 'desktop' | 'unknown'

interface InstallPwaContextType {
  canPrompt: boolean
  isStandalone: boolean
  isInstalled: boolean
  platform: DevicePlatform
  isInAppBrowser: boolean
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  promptInstall: () => Promise<void>
}

const InstallPwaContext = createContext<InstallPwaContextType | null>(null)

export function InstallPwaProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isStandalone, setIsStandalone] = useState<boolean>(false)
  const [isInstalled, setIsInstalled] = useState<boolean>(false)
  const [platform, setPlatform] = useState<DevicePlatform>('unknown')
  const [isInAppBrowser, setIsInAppBrowser] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    // 1. Detect Standalone mode (already installed / launched from home screen)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://')
      setIsStandalone(Boolean(isStandaloneMode))
      if (isStandaloneMode) {
        setIsInstalled(true)
      }
    }

    checkStandalone()

    // 2. Detect Platform
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera || ''
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    const isAndroidDevice = /Android/i.test(ua)

    if (isIOSDevice) {
      setPlatform('ios')
    } else if (isAndroidDevice) {
      setPlatform('android')
    } else if (/Windows|Macintosh|Linux/i.test(ua) && !/Mobile/i.test(ua)) {
      setPlatform('desktop')
    } else {
      setPlatform('unknown')
    }

    // 3. Detect In-App Browsers (Instagram, Facebook, TikTok, etc.)
    const inApp = /FBAN|FBAV|Instagram|Line|Twitter|Snapchat|musical_ly|TikTok|WhatsApp|MicroMessenger/i.test(ua)
    setIsInAppBrowser(inApp)

    // 4. Capture beforeinstallprompt event (Chrome, Edge, Android browsers)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    // 5. Capture appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
      setIsModalOpen(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsStandalone(true)
        setIsInstalled(true)
      }
    }
    mediaQuery.addEventListener('change', handleDisplayModeChange)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      mediaQuery.removeEventListener('change', handleDisplayModeChange)
    }
  }, [])

  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const promptInstall = useCallback(async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt()
        const choice = await deferredPrompt.userChoice
        if (choice && choice.outcome === 'accepted') {
          setIsInstalled(true)
          setDeferredPrompt(null)
          setIsModalOpen(false)
        }
      } catch (err) {
        console.error("Erreur lors de l'installation:", err)
        openModal()
      }
    } else {
      // If direct prompt is not supported (iOS Safari or desktop without prompt), open the guided modal
      openModal()
    }
  }, [deferredPrompt, openModal])

  return (
    <InstallPwaContext.Provider
      value={{
        canPrompt: Boolean(deferredPrompt),
        isStandalone,
        isInstalled,
        platform,
        isInAppBrowser,
        isModalOpen,
        openModal,
        closeModal,
        promptInstall,
      }}
    >
      {children}
    </InstallPwaContext.Provider>
  )
}

export function useInstallPwa() {
  const context = useContext(InstallPwaContext)
  if (!context) {
    throw new Error('useInstallPwa must be used within an InstallPwaProvider')
  }
  return context
}
