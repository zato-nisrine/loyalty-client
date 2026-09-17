'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteCardButton({ cardId }: { cardId: string }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  async function handleDelete() {
    setDeleting(true)
    setError('')

    const res = await fetch(`/api/loyalty-cards/${cardId}`, { method: 'DELETE' })

    if (!res.ok) {
      setDeleting(false)
      const data = await res.json().catch(() => null)
      setError(data?.message || 'Erreur lors de la suppression')
      return
    }

    router.push('/cards')
    router.refresh()
  }

  if (confirming) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-center">
        <p className="text-sm font-medium text-foreground">Supprimer définitivement cette carte ?</p>
        <p className="mt-1 text-xs text-text-muted">
          Vos points et tout votre historique avec ce commerce seront perdus. Cette action est irréversible.
        </p>
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => setConfirming(false)}
            disabled={deleting}
            className="rounded-full border border-border-subtle px-5 py-2 text-sm font-medium text-foreground disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {deleting ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="w-full rounded-2xl border border-border-subtle py-3 text-sm font-medium text-red-500 hover:bg-red-500/5"
    >
      Supprimer la carte
    </button>
  )
}
