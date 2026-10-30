import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import NotificationManager from "@/components/NotificationManager";
import { ThemeProvider } from "@/lib/theme";
import { InstallPwaProvider } from "@/components/InstallPwaContext";
import InstallModal from "@/components/InstallModal";

export const metadata: Metadata = {
  title: "LOYNIVA — Mes cartes de fidélité",
  description: "Vos cartes de fidélité, vos points et vos récompenses. Chaque visite compte.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LOYNIVA",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
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
          <InstallPwaProvider>
            {children}
            <InstallModal />
            <ServiceWorkerRegister />
            <NotificationManager />
          </InstallPwaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
