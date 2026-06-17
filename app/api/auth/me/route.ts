import { NextResponse } from 'next/server'
import { getClient } from '@/lib/auth'

export async function GET() {
  const client = await getClient()
  if (!client) return NextResponse.json({ authenticated: false })
  return NextResponse.json({ authenticated: true, client })
}
