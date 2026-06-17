'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-stone-300 px-4 py-1.5 text-sm font-medium text-stone-700"
    >
      Déconnexion
    </button>
  )
}
