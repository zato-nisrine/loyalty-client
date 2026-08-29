'use client'

import { useEffect, useState } from 'react'
import { getClient } from '@/lib/auth-client'
import OneSignalProvider from './OneSignalProvider'

export default function NotificationManager() {
  const [clientId, setClientId] = useState<string | null>(null)

  useEffect(() => {
    async function loadClient() {
      const client = await getClient()
      if (client) {
        setClientId(client.id)
      }
    }
    loadClient()
  }, [])

  if (!clientId) return null

  return <OneSignalProvider clientId={clientId} />
}
