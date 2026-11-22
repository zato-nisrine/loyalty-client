export function getClientToken() {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/access_token=([^;]+)/)
  return match ? match[1] : null
}

export async function getClient() {
  try {
    const res = await fetch('/api/auth/me', { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.authenticated ? data.client : null
  } catch (error) {
    console.error('Erreur getClient:', error)
    return null
  }
}
