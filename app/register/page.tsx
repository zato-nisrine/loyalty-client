'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function RegisterContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, birthDate, password }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data.message || "Erreur lors de l'inscription")
      return
    }

    router.push(token ? `/join?token=${token}` : '/cards')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-stone-900">
            Créer mon compte
          </h1>
          <p className="mt-1 text-sm text-stone-500">Rejoignez vos restaurants préférés</p>
        </div>

        <div className="space-y-3 rounded-2xl border border-stone-200 bg-white p-5">
          <div className="space-y-1">
            <label className="text-sm text-stone-600">Votre Pseudo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-stone-600">Téléphone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="229XXXXXXXX"
              className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-stone-600">Date de naissance</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              max={new Date().toISOString().split('T')[0]}
              className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-900"
            />
            <p className="text-xs text-stone-400">Pour recevoir une surprise le jour de votre anniversaire 🎉</p>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-stone-600">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-900"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-stone-900 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? 'Création...' : 'Créer mon compte'}
          </button>
        </div>

        <p className="text-center text-sm text-stone-500">
          Déjà un compte ?{' '}
          <a href={token ? `/login?token=${token}` : '/login'} className="font-medium text-stone-900 underline">
            Se connecter
          </a>
        </p>
      </form>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#FAF7F2]"><p className="text-sm text-stone-400">Chargement...</p></div>}>
      <RegisterContent />
    </Suspense>
  )
}
