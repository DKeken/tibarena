import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Initialize fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
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
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-screen w-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans size-full antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
