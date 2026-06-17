'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BottomNav from '@/components/BottomNav'
import QrScannerComponent from '@/components/QrScanner'

function extractToken(scannedValue: string): string {
  try {
    const url = new URL(scannedValue)
    const token = url.searchParams.get('token')
    if (token) return token
  } catch {
    // Not a URL, treat as raw token
  }
  return scannedValue
}

export default function JoinPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'scan' | 'manual'>('scan')
  const [qrCodeToken, setQrCodeToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [scanLocked, setScanLocked] = useState(false)

  async function joinWithToken(token: string) {
    setError('')
    setLoading(true)

    const res = await fetch('/api/loyalty-cards/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qrCodeToken: token }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.message || 'Erreur lors de la création de la carte')
      setScanLocked(false)
      return
    }

    router.push('/cards')
    router.refresh()
  }

  function handleScan(scannedValue: string) {
    if (scanLocked) return
    setScanLocked(true)
    const token = extractToken(scannedValue)
    setQrCodeToken(token)
    joinWithToken(token)
  }

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault()
    joinWithToken(qrCodeToken)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-20">
      <div className="px-5 py-8">
        <div className="mx-auto max-w-sm space-y-5">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">
              Rejoindre un restaurant
            </h1>
            <p className="mt-1 text-sm text-stone-500">Scannez le QR code affiché en caisse</p>
          </div>

          <div className="flex rounded-full border border-stone-200 bg-white p-1">
            <button
              onClick={() => setMode('scan')}
              className={`flex-1 rounded-full py-2 text-sm font-medium ${
                mode === 'scan' ? 'bg-stone-900 text-white' : 'text-stone-600'
              }`}
            >
              Scanner
            </button>
            <button
              onClick={() => setMode('manual')}
              className={`flex-1 rounded-full py-2 text-sm font-medium ${
                mode === 'manual' ? 'bg-stone-900 text-white' : 'text-stone-600'
              }`}
            >
              Saisie manuelle
            </button>
          </div>

          {mode === 'scan' ? (
            <div className="space-y-3">
              <QrScannerComponent onScan={handleScan} />
              {loading && <p className="text-center text-sm text-stone-500">Connexion en cours...</p>}
              {error && <p className="text-center text-sm text-red-600">{error}</p>}
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-3 rounded-2xl border border-stone-200 bg-white p-5">
              <div className="space-y-1">
                <label className="text-sm text-stone-600">Code du restaurant</label>
                <input
                  type="text"
                  value={qrCodeToken}
                  onChange={(e) => setQrCodeToken(e.target.value)}
                  required
                  placeholder="Collé depuis le QR code"
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
          )}

          <Link href="/cards" className="block text-center text-sm font-medium text-stone-500">
            Retour à mes cartes
          </Link>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
