import { getClient, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import BottomNav from '@/components/BottomNav'
import ThemeToggle from '@/components/ThemeToggle'

export default async function CardsLayout({ children }: { children: React.ReactNode }) {
  const client = await getClient()
  if (!client) redirect('/login')

  const token = await getToken()
  const cardsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/me/cards`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })
  const cardCount = cardsRes.ok ? (await cardsRes.json()).length : 0

  const initials = client.name
    .split(' ')
    .map((part: string) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
            {initials}
          </div>
          <div>
            <p className="text-[15px] font-medium leading-tight text-foreground">{client.name}</p>
            <p className="text-xs text-text-muted">
              {cardCount} carte{cardCount > 1 ? 's' : ''} active{cardCount > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-lg px-4 pb-6">{children}</main>
      <BottomNav />
    </div>
  )
}
