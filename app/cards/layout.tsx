import { getClient } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import BottomNav from '@/components/BottomNav'

export default async function CardsLayout({ children }: { children: React.ReactNode }) {
  const client = await getClient()
  if (!client) redirect('/login')

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-20">
      <header className="flex items-center justify-between border-b border-stone-200 bg-white px-5 py-4">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
            Bonjour {client.name.split(' ')[0]}
          </p>
        </div>
        <LogoutButton />
      </header>
      <main className="mx-auto max-w-lg px-4 py-6">{children}</main>
      <BottomNav />
    </div>
  )
}
