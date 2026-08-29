'use client'

import { useEffect } from 'react'

export default function OneSignalProvider({ clientId }: { clientId: string }) {
  useEffect(() => {
    // Load OneSignal SDK
    const script = document.createElement('script')
    script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js'
    script.defer = true
    document.head.appendChild(script)

    script.onload = () => {
      window.OneSignalDeferred = window.OneSignalDeferred || []
      window.OneSignalDeferred.push(async function(OneSignal: any) {
        try {
          await OneSignal.init({
            appId: '0303122a-20b3-4b98-ac91-90fdc9ca70d3',
            safari_web_id: 'web.onesignal.auto.337e82fd-eeda-48f8-8fe5-d2f6dec774c2',
            notifyButton: {
              enable: true,
            },
            allowLocalhostAsSecureOrigin: true,
          })

          // Set external user ID to client ID
          await OneSignal.login(clientId)

          // Request notification permission
          await OneSignal.Notifications.requestPermission()

          console.log('OneSignal initialisé pour client:', clientId)
        } catch (error) {
          console.error('Erreur initialisation OneSignal:', error)
        }
      })
    }

    return () => {
      document.head.removeChild(script)
    }
  }, [clientId])

  return null
}
