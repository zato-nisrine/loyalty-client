'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  {
    href: '/cards',
    label: 'Mes cartes',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="5" width="18" height="12" rx="2.5" stroke="currentColor" strokeWidth={active ? 2 : 1.5} />
        <path d="M2 9H20" stroke="currentColor" strokeWidth={active ? 2 : 1.5} />
      </svg>
    ),
  },
  {
    href: '/join',
    label: 'Rejoindre',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth={active ? 2 : 1.5} />
        <path d="M11 7V15M7 11H15" stroke="currentColor" strokeWidth={active ? 2 : 1.5} strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-lg justify-around">
        {links.map((link) => {
          const active = pathname === link.href || (link.href === '/cards' && pathname.startsWith('/cards/'))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium ${
                active ? 'text-stone-900' : 'text-stone-400'
              }`}
            >
              {link.icon(active)}
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
