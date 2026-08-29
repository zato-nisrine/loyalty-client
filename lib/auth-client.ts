export function getClientToken() {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/access_token=([^;]+)/)
  return match ? match[1] : null
}

export async function getClient() {
  const token = getClientToken()
  if (!token) return null

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) return null

  return res.json()
}
