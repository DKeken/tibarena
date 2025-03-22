import type { Metadata, Viewport } from "next";
import { Providers } from "./_components/providers";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme.provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

// Initialize fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata configuration
export const metadata: Metadata = {
  title: "TIB Arena",
  description: "Welcome to TIB Arena - Your Ultimate Gaming Platform",
  keywords: ["gaming", "arena", "TIB", "platform"],
};

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

// Root layout component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-screen w-screen" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans size-full antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>{children}</Providers>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
