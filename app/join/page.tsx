'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'

export default function JoinPage() {
  const router = useRouter()
  const [qrCodeToken, setQrCodeToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/loyalty-cards/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qrCodeToken }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.message || 'Erreur lors de la création de la carte')
      return
    }

    router.push('/cards')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-20">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5">
        <div className="w-full max-w-sm space-y-5">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">
              Rejoindre un restaurant
            </h1>
            <p className="mt-1 text-sm text-stone-500">Scannez le QR code affiché en caisse</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-stone-200 bg-white p-5">
            <div className="space-y-1">
              <label className="text-sm text-stone-600">Code du restaurant</label>
              <input
                type="text"
                value={qrCodeToken}
                onChange={(e) => setQrCodeToken(e.target.value)}
                required
                placeholder="Collé depuis le QR code scanné"
                className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-900"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-stone-900 py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {loading ? 'Création...' : 'Rejoindre'}
            </button>
          </form>

          <Link href="/cards" className="block text-center text-sm font-medium text-stone-500">
            Retour à mes cartes
          </Link>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
