import { NextResponse } from 'next/server'
import { getToken } from '@/lib/auth'

export async function POST() {
  const token = await getToken()
  if (!token) {
    return NextResponse.json({ error: 'Session expirée, veuillez vous reconnecter' }, { status: 401 })
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/me/test-notification`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      return NextResponse.json(
        { error: errData.message || 'Impossible d\'envoyer la notification de test' },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error('Erreur API route test notification:', err)
    return NextResponse.json({ error: 'Erreur réseau vers le serveur' }, { status: 500 })
  }
}

