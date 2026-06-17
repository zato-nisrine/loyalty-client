'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.message || 'Erreur de connexion')
      return
    }

    router.push(token ? `/join?token=${token}` : '/cards')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900">
            Mes cartes
          </h1>
          <p className="mt-1 text-sm text-stone-500">Connectez-vous pour voir vos points</p>
        </div>

        <div className="space-y-3 rounded-2xl border border-stone-200 bg-white p-5">
          <div className="space-y-1">
            <label className="text-sm text-stone-600">Téléphone ou email</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-stone-600">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-900"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-stone-900 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </div>

        <p className="text-center text-sm text-stone-500">
          Pas de compte ?{' '}
          <a href={token ? `/register?token=${token}` : '/register'} className="font-medium text-stone-900 underline">
            S'inscrire
          </a>
        </p>
      </form>
    </div>
  )
}
