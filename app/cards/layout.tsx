import { getClient, getToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import BottomNav from '@/components/BottomNav'
import ThemeToggle from '@/components/ThemeToggle'
import LoynivaLogo from '@/components/LoynivaLogo'

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
    <div className="min-h-screen bg-background pb-24 text-text-main">
      <header className="flex items-center justify-between border-b border-border-subtle bg-surface px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#102A43] text-sm font-bold text-white shadow-xs dark:bg-[#4F9DCE]">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-display text-[15px] font-bold leading-tight text-foreground">{client.name}</p>
            </div>
            <p className="text-xs text-text-muted">
              {cardCount} carte{cardCount > 1 ? 's' : ''} LOYNIVA active{cardCount > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-lg px-4 pt-5 pb-6">{children}</main>
      <BottomNav />
    </div>
  )
}
