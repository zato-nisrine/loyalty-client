'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import PhoneInput from '@/components/PhoneInput'
import LoynivaLogo from '@/components/LoynivaLogo'

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F8FC] px-5 py-12 dark:bg-[#091420]">
      <div className="mb-6 flex flex-col items-center text-center">
        <LoynivaLogo size="md" showTagline={true} />
      </div>

      <div className="w-full max-w-sm rounded-2xl border border-[#D8E0E8] bg-white p-7 shadow-xs dark:border-white/10 dark:bg-[#102A43]">
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl font-bold text-[#102A43] dark:text-white">
            Créer mon compte client
          </h1>
          <p className="mt-1 text-xs text-[#5B7286] dark:text-[#8FA6BA]">
            Rejoignez vos commerces préférés et cumulez vos points
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#243746] dark:text-[#D8E0E8]">
              Votre prénom ou pseudo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ex : Sarah ou Alexandre"
              className="w-full rounded-xl border border-[#D8E0E8] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#243746] outline-none transition-all focus:border-[#4F9DCE] focus:bg-white focus:ring-2 focus:ring-[#4F9DCE]/20 dark:border-white/10 dark:bg-[#173859] dark:text-white"
            />
          </div>

          <PhoneInput
            value={phone}
            onChange={setPhone}
            required
            error={error}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#243746] dark:text-[#D8E0E8]">
              Date de naissance
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              max={new Date().toISOString().split('T')[0]}
              className="w-full rounded-xl border border-[#D8E0E8] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#243746] outline-none transition-all focus:border-[#4F9DCE] focus:bg-white focus:ring-2 focus:ring-[#4F9DCE]/20 dark:border-white/10 dark:bg-[#173859] dark:text-white"
            />
            <p className="text-[11px] text-[#5B7286] dark:text-[#8FA6BA]">
              Pour recevoir une surprise exclusive le jour de votre anniversaire 🎁
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#243746] dark:text-[#D8E0E8]">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Au moins 6 caractères"
              className="w-full rounded-xl border border-[#D8E0E8] bg-[#F5F8FC] px-3.5 py-2.5 text-sm text-[#243746] outline-none transition-all focus:border-[#4F9DCE] focus:bg-white focus:ring-2 focus:ring-[#4F9DCE]/20 dark:border-white/10 dark:bg-[#173859] dark:text-white"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-[#C43D4D]/20 bg-[#C43D4D]/10 p-3 text-xs text-[#C43D4D] font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#102A43] py-3 text-sm font-semibold text-white hover:bg-[#1A3E61] transition-all disabled:opacity-50"
          >
            {loading ? 'Création en cours...' : 'Créer mon compte'}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-[#5B7286] dark:text-[#8FA6BA]">
          Déjà un compte ?{' '}
          <Link
            href={token ? `/login?token=${token}` : '/login'}
            className="font-semibold text-[#4F9DCE] hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-[#5B7286] dark:text-[#8FA6BA]">
        LOYNIVA • « Chaque visite compte. »
      </p>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#F5F8FC]"><p className="text-sm text-[#5B7286]">Chargement...</p></div>}>
      <RegisterContent />
    </Suspense>
  )
}
