import { getClient } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import BottomNav from '@/components/BottomNav'
import ThemeToggle from '@/components/ThemeToggle'

export default async function CardsLayout({ children }: { children: React.ReactNode }) {
  const client = await getClient()
  if (!client) redirect('/login')

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center justify-between border-b border-border-subtle bg-background px-5 py-4">
        <div>
          <p className="text-xs text-text-muted">Bonjour</p>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
            {client.name.split(' ')[0]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-lg px-4 py-6">{children}</main>
      <BottomNav />
    </div>
  )
}
