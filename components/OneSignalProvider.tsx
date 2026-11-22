'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { getClient } from '@/lib/auth-client'
import { useInstallPwa } from './InstallPwaContext'

export type NotificationPermissionState = 'default' | 'granted' | 'denied' | 'unsupported'

interface NotificationContextType {
  isSupported: boolean
  permission: NotificationPermissionState
  isSubscribed: boolean
  isLoading: boolean
  isTesting: boolean
  clientId: string | null
  clientName: string | null
  requestPermission: () => Promise<boolean>
  sendTestNotification: () => Promise<{ success: boolean; message?: string }>
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification doit être utilisé à l\'intérieur de OneSignalProvider')
  }
  return context
}

const ONESIGNAL_APP_ID = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || '0303122a-20b3-4b98-ac91-90fdc9ca70d3'
const SAFARI_WEB_ID = 'web.onesignal.auto.337e82fd-eeda-48f8-8fe5-d2f6dec774c2'

export default function OneSignalProvider({ children }: { children?: React.ReactNode }) {
  const { isStandalone, platform } = useInstallPwa()
  const [clientId, setClientId] = useState<string | null>(null)
  const [clientName, setClientName] = useState<string | null>(null)
  const [permission, setPermission] = useState<NotificationPermissionState>('default')
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isTesting, setIsTesting] = useState<boolean>(false)
  const [isSupported, setIsSupported] = useState<boolean>(true)
  const initializedRef = useRef(false)

  // 1. Charger les données du client connecté
  useEffect(() => {
    let isMounted = true
    async function loadClient() {
      try {
        const client = await getClient()
        if (isMounted && client) {
          setClientId(client.id)
          setClientName(client.name || null)
        }
      } catch (err) {
        console.error('Erreur chargement client pour OneSignal:', err)
      }
    }
    loadClient()
    return () => {
      isMounted = false
    }
  }, [])

  // 2. Vérifier la compatibilité des notifications
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Sur iOS, les Web Push exigent iOS 16.4+ ET que l'application soit installée sur l'écran d'accueil
    if (platform === 'ios' && !isStandalone) {
      // Dans Safari standard (hors PWA écran d'accueil), Web Push n'est pas encore disponible
      setIsSupported(false)
      setPermission('unsupported')
      return
    }

    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      setIsSupported(false)
      setPermission('unsupported')
      return
    }

    setIsSupported(true)
    const currentPermission = Notification.permission as NotificationPermissionState
    setPermission(currentPermission)
    if (currentPermission === 'granted') {
      setIsSubscribed(true)
    }
  }, [platform, isStandalone])

  // 3. Charger et initialiser le SDK OneSignal v16
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!ONESIGNAL_APP_ID) return

    // Injecter le script OneSignal si absent
    if (!document.getElementById('onesignal-sdk')) {
      const script = document.createElement('script')
      script.id = 'onesignal-sdk'
      script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js'
      script.defer = true
      document.head.appendChild(script)
    }

    if (initializedRef.current) return
    initializedRef.current = true

    window.OneSignalDeferred = window.OneSignalDeferred || []
    window.OneSignalDeferred.push(async function (OneSignal: any) {
      try {
        await OneSignal.init({
          appId: ONESIGNAL_APP_ID,
          safari_web_id: SAFARI_WEB_ID,
          allowLocalhostAsSecureOrigin: true,
          notifyButton: {
            enable: false, // UI mobile personnalisée
          },
        })

        // Vérification de la permission actuelle
        if (typeof Notification !== 'undefined') {
          const perm = Notification.permission as NotificationPermissionState
          setPermission(perm)
          if (perm === 'granted') {
            setIsSubscribed(true)
          }
        }

        // Écouter les changements d'autorisation
        if (OneSignal.Notifications && OneSignal.Notifications.addEventListener) {
          OneSignal.Notifications.addEventListener('permissionChange', (isPermitted: boolean) => {
            const newPerm = isPermitted ? 'granted' : 'denied'
            setPermission(newPerm)
            setIsSubscribed(isPermitted)
          })
        }
      } catch (error) {
        console.warn('Erreur initialisation OneSignal:', error)
      }
    })
  }, [])

  // 4. Lier l'ID du client à OneSignal dès qu'il est connecté
  useEffect(() => {
    if (!clientId) return
    window.OneSignalDeferred = window.OneSignalDeferred || []
    window.OneSignalDeferred.push(async function (OneSignal: any) {
      try {
        await OneSignal.login(clientId)
        console.log('OneSignal: client associé', clientId)
      } catch (error) {
        console.error('Erreur association client OneSignal:', error)
      }
    })
  }, [clientId])

  // 5. Demande d'autorisation déclenchée par une action utilisateur (obligatoire sur iOS)
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false
    if (!('Notification' in window)) {
      setPermission('unsupported')
      return false
    }

    setIsLoading(true)
    try {
      return await new Promise<boolean>((resolve) => {
        window.OneSignalDeferred = window.OneSignalDeferred || []
        window.OneSignalDeferred.push(async function (OneSignal: any) {
          try {
            await OneSignal.Notifications.requestPermission()
            const isPermitted = Notification.permission === 'granted'
            setPermission(Notification.permission as NotificationPermissionState)
            setIsSubscribed(isPermitted)

            if (isPermitted) {
              if (clientId) {
                await OneSignal.login(clientId)
              }

              // Déclencher une notification locale de bienvenue immédiate
              try {
                if ('serviceWorker' in navigator) {
                  const reg = await navigator.serviceWorker.ready
                  if (reg && reg.showNotification) {
                    await reg.showNotification('LOYNIVA 🎉', {
                      body: 'Notifications activées ! Vous recevrez vos points et récompenses en direct.',
                      icon: '/icons/icon-192.png',
                      badge: '/icons/icon-192.png',
                    })
                  }
                }
              } catch (swErr) {
                console.warn('Notification SW de bienvenue non supportée:', swErr)
              }
            }
            resolve(isPermitted)
          } catch (err) {
            console.error('Erreur demande permission OneSignal:', err)
            resolve(false)
          } finally {
            setIsLoading(false)
          }
        })
      })
    } catch (e) {
      console.error('Erreur générale requestPermission:', e)
      setIsLoading(false)
      return false
    }
  }, [clientId])

  // 6. Envoi d'une notification de test réelle pour vérifier le fonctionnement sur mobile
  const sendTestNotification = useCallback(async (): Promise<{ success: boolean; message?: string }> => {
    setIsTesting(true)
    try {
      const res = await fetch('/api/notifications/test', {
        method: 'POST',
      })
      const data = await res.json()

      // Afficher également une confirmation par Service Worker
      try {
        if ('serviceWorker' in navigator && Notification.permission === 'granted') {
          const reg = await navigator.serviceWorker.ready
          if (reg && reg.showNotification) {
            await reg.showNotification('LOYNIVA — Test réussi ! 🔔', {
              body: 'Vos notifications push mobiles fonctionnent parfaitement.',
              icon: '/icons/icon-192.png',
              badge: '/icons/icon-192.png',
            })
          }
        }
      } catch (e) {
        // Ignorer
      }

      if (!res.ok) {
        return { success: false, message: data.error || 'Erreur lors de l\'envoi' }
      }
      return { success: true }
    } catch (err: any) {
      console.error('Erreur test notification:', err)
      return { success: false, message: err?.message || 'Erreur de connexion' }
    } finally {
      setIsTesting(false)
    }
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        isSupported,
        permission,
        isSubscribed,
        isLoading,
        isTesting,
        clientId,
        clientName,
        requestPermission,
        sendTestNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
