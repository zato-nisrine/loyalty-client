import { NextRequest, NextResponse } from 'next/server'
import { getToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const token = await getToken()
  if (!token) return NextResponse.json({ message: 'Non authentifié' }, { status: 401 })

  const body = await req.json()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/loyalty-cards/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  })

  if (!res.ok) return NextResponse.json(await res.json(), { status: res.status })
  return NextResponse.json(await res.json())
}
