'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CodeRedeemForm({ cardId, brandColor }: { cardId: string; brandColor: string }) {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState<any>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(null)
    setLoading(true)

    const res = await fetch('/api/validation-codes/use', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code.toUpperCase(), loyaltyCardId: cardId }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.message || 'Code invalide')
      return
    }

    const data = await res.json()
    setSuccess(data)
    setCode('')
    router.refresh()
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <h2 className="mb-3 font-[family-name:var(--font-display)] text-base font-semibold text-stone-900">
        Saisir un code
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          placeholder="ABX72"
          maxLength={6}
          className="flex-1 rounded-lg border border-stone-300 px-3 py-2.5 text-center text-lg font-semibold uppercase tracking-widest text-stone-900"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          style={{ backgroundColor: brandColor || '#C2410C' }}
        >
          {loading ? '...' : 'Valider'}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && (
        <p className="mt-2 text-sm font-medium text-green-700">
          +{success.pointsEarned} points crédités !
        </p>
      )}
    </div>
  )
}
