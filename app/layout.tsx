import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import NotificationManager from "@/components/NotificationManager";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: "LOYNIVA - Mes cartes de fidélité",
  description: "Vos cartes de fidélité, vos points et vos récompenses. Chaque visite compte.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LOYNIVA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-content",
  themeColor: "#102A43",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider>
          {children}
          <ServiceWorkerRegister />
          <NotificationManager />
        </ThemeProvider>
      </body>
    </html>
  );
}