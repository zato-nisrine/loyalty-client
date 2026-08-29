import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import NotificationManager from "@/components/NotificationManager";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Fidèle — Carte de fidélité",
  description: "Vos cartes de fidélité, vos points, vos récompenses.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Fidèle",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased dark" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          {children}
          <ServiceWorkerRegister />
          <NotificationManager />
        </ThemeProvider>
      </body>
    </html>
  );
}
