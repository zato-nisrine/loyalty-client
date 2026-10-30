import Link from 'next/link'
import { getClient } from '@/lib/auth'
import LoynivaLogo from '@/components/LoynivaLogo'
import ThemeToggle from '@/components/ThemeToggle'

export default async function HomePage() {
  const client = await getClient()

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors selection:bg-[#4F9DCE] selection:text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[950px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#4F9DCE]/15 via-[#102A43]/5 to-transparent blur-3xl dark:from-[#4F9DCE]/10 dark:via-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between py-5 sm:py-6">
          <Link href="/" className="transition-opacity hover:opacity-90">
            <LoynivaLogo size="md" showTagline={true} />
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle />

            {client ? (
              <Link
                href="/cards"
                className="flex items-center gap-2 rounded-xl bg-[#102A43] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1A3E61] dark:bg-[#4F9DCE] dark:text-[#091420] dark:hover:bg-[#69B0DC]"
              >
                <span>Mes cartes</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl border border-border-subtle bg-surface px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:border-[#4F9DCE] hover:text-[#4F9DCE] sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-[#102A43] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#1A3E61] dark:bg-[#4F9DCE] dark:text-[#091420] dark:hover:bg-[#69B0DC] sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  Créer un compte
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-8 pb-16 sm:pt-14 sm:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Text & CTAs */}
            <div className="text-center lg:col-span-7 lg:text-left">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#4F9DCE]/30 bg-[#4F9DCE]/10 px-3.5 py-1 text-xs font-semibold text-[#102A43] dark:text-[#4F9DCE]">
                <span className="flex h-2 w-2 rounded-full bg-[#16845B] animate-pulse" />
                Votre porte-cartes de fidélité digital
              </div>

              <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.15]">
                Toutes vos cartes de fidélité.{' '}
                <span className="bg-gradient-to-r from-[#102A43] via-[#4F9DCE] to-[#16845B] bg-clip-text text-transparent dark:from-white dark:via-[#4F9DCE] dark:to-[#69B0DC]">
                  Toujours dans votre poche.
                </span>
              </h1>

              <p className="mt-5 text-base text-text-muted sm:text-lg sm:leading-relaxed">
                Fini les cartes en carton perdues ou oubliées au fond du portefeuille. 
                Cumulez vos points en un clin d’œil chez vos commerçants préférés et débloquez des réductions et récompenses exclusives.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start">
                <Link
                  href={client ? '/cards' : '/register'}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#102A43] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1A3E61] hover:shadow-lg dark:bg-[#4F9DCE] dark:text-[#091420] dark:hover:bg-[#69B0DC] sm:w-auto"
                >
                  <span>{client ? 'Ouvrir mon portefeuille' : 'Créer ma première carte'}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link
                  href="/join"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-[#4F9DCE] hover:bg-surface-muted sm:w-auto"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                    <rect x="7" y="7" width="10" height="10" rx="1" />
                  </svg>
                  <span>Scanner un QR Code</span>
                </Link>
              </div>

              {/* Trust highlights */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-text-muted lg:justify-start">
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-[#16845B]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% gratuit pour les clients</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-[#16845B]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Sans application à installer (PWA)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-[#16845B]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Respect de vos données personnelles</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Mockup */}
            <div className="flex justify-center lg:col-span-5">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                {/* Behind Glow */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#102A43] via-[#4F9DCE] to-[#16845B] opacity-25 blur-xl filter" />

                {/* Card Stack Preview */}
                <div className="relative space-y-3.5">
                  {/* Card 1: Main Active Loyalty Card */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[#102A43] via-[#173859] to-[#1E4469] p-5 text-white shadow-2xl transition-transform hover:-translate-y-1">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F9DCE] font-bold text-white shadow-xs">
                          ☕
                        </div>
                        <div>
                          <p className="font-display text-sm font-bold tracking-tight">Le Café des Arts</p>
                          <p className="text-[11px] text-[#D8E0E8]">Bistrot & Torréfacteur</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-[#4F9DCE] backdrop-blur-xs">
                        VIP Gold
                      </span>
                    </div>

                    <div className="mt-5">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-wider text-[#D8E0E8]">Solde actuel</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-display text-3xl font-extrabold text-white">420</span>
                            <span className="text-xs font-semibold text-[#4F9DCE]">points</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="rounded-lg bg-[#16845B]/80 px-2 py-1 text-[11px] font-bold text-white">
                            Cadeau prêt !
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#4F9DCE] to-[#16845B]" style={{ width: '84%' }} />
                        </div>
                        <div className="mt-1.5 flex justify-between text-[10px] text-[#D8E0E8]">
                          <span>Café offert débloqué</span>
                          <span className="font-semibold text-white">Prochain palier : 500 pts</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px]">
                      <span className="text-[#D8E0E8]">Pass Membre • #7821</span>
                      <span className="flex items-center gap-1 font-semibold text-[#4F9DCE]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#16845B]" /> Actif
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Second Preview */}
                  <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-md transition-transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#16845B] text-white font-bold text-sm">
                          🥐
                        </div>
                        <div>
                          <p className="font-display text-sm font-bold text-foreground">Boulangerie Saint-Honoré</p>
                          <p className="text-[11px] text-text-muted">10 tampons = 1 baguette offerte</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-display text-sm font-bold text-foreground">7 / 10</span>
                        <p className="text-[10px] text-text-muted">tampons</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Benefits Grid */}
        <section className="border-t border-border-subtle py-16 sm:py-20">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Pourquoi choisir LOYNIVA pour vos sorties ?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-text-muted sm:text-base">
              Conçu pour vous offrir une expérience fluide, sans friction et réellement avantageuse chez tous vos commerces de proximité.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-xs transition-all hover:border-[#4F9DCE] hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4F9DCE]/10 text-accent">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">
                Sans application à télécharger
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                Accessible directement depuis votre navigateur mobile. Vous pouvez l’ajouter sur votre écran d’accueil en un tap grâce à la technologie PWA.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-xs transition-all hover:border-[#4F9DCE] hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#16845B]/10 text-[#16845B]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">
                Cumulez à chaque passage
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                Présentez votre QR code ou renseignez le code en caisse pour créditer vos visites ou points en temps réel, sans contact ni attente.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-xs transition-all hover:border-[#4F9DCE] hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#B96A13]/10 text-[#B96A13]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">
                Récompenses & Privilèges
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                Café offert, remise sur l'addition, cadeau surprise : choisissez la récompense qui vous fait plaisir et réclamez-la en caisse en toute simplicité.
              </p>
            </div>
          </div>
        </section>

        {/* 3 Steps Section */}
        <section className="border-t border-border-subtle py-16 sm:py-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Simple & Rapide</span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Comment ça fonctionne ?
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#102A43] text-lg font-bold text-white shadow-md dark:bg-[#4F9DCE] dark:text-[#091420]">
                1
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">Scannez le QR Code</h3>
              <p className="mt-2 text-sm text-text-muted">
                Au comptoir ou sur la table de votre commerce, scannez le QR code LOYNIVA pour ajouter sa carte à votre profil en 2 secondes.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#102A43] text-lg font-bold text-white shadow-md dark:bg-[#4F9DCE] dark:text-[#091420]">
                2
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">Cumulez vos points</h3>
              <p className="mt-2 text-sm text-text-muted">
                À chaque addition ou commande, le commerçant vous attribue des points directement synchronisés sur votre espace.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#102A43] text-lg font-bold text-white shadow-md dark:bg-[#4F9DCE] dark:text-[#091420]">
                3
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">Savourez vos avantages</h3>
              <p className="mt-2 text-sm text-text-muted">
                Consultez la liste des récompenses disponibles et faites valider votre récompense lors de votre prochaine visite.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Card Banner */}
        <section className="py-12 sm:py-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#102A43] via-[#1A3E61] to-[#245078] px-6 py-12 text-center text-white shadow-2xl sm:px-12 sm:py-16">
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-4xl">
                Prêt à ne plus jamais perdre un avantage ?
              </h2>
              <p className="mt-4 text-sm text-[#D8E0E8] sm:text-base">
                Créez votre compte gratuit dès maintenant et rassemblez toutes vos cartes de fidélité au même endroit.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={client ? '/cards' : '/register'}
                  className="w-full rounded-xl bg-[#4F9DCE] px-6 py-3.5 text-sm font-bold text-[#091420] shadow-md transition-all hover:bg-[#69B0DC] hover:shadow-lg sm:w-auto"
                >
                  {client ? 'Accéder à mes cartes' : 'Créer mon compte fidélité'}
                </Link>

                <Link
                  href="/join"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xs transition-colors hover:bg-white/20 sm:w-auto"
                >
                  Rejoindre un commerce
                </Link>
              </div>
            </div>

            {/* Ambient light glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#4F9DCE]/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#16845B]/30 blur-3xl" />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border-subtle py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <LoynivaLogo size="sm" showTagline={false} />

            <div className="flex items-center gap-6 text-xs text-text-muted">
              <Link href="/cards" className="hover:text-foreground transition-colors">
                Mes cartes
              </Link>
              <Link href="/join" className="hover:text-foreground transition-colors">
                Rejoindre
              </Link>
              <Link href="/login" className="hover:text-foreground transition-colors">
                Connexion
              </Link>
              <Link href="/register" className="hover:text-foreground transition-colors">
                Inscription
              </Link>
            </div>

            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} LOYNIVA. Chaque visite compte.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}