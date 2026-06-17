import { NextResponse } from 'next/server'
import { getToken } from '@/lib/auth'

export async function GET(req: Request, { params }: { params: Promise<{ cardId: string }> }) {
  const token = await getToken()
  if (!token) return NextResponse.json({ message: 'Non authentifié' }, { status: 401 })

  const { cardId } = await params

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/loyalty-cards/${cardId}/reward-rules`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) return NextResponse.json(await res.json(), { status: res.status })
  return NextResponse.json(await res.json())
}
