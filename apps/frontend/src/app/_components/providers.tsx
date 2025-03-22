"use client";

import { config } from "@/utils/wagmi.config";
import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { createQueryClient } from "@/utils/query.client";
import { AuthProvider } from "@/components/auth.provider";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { AuthGuard } from "@/components/auth.guard";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = createQueryClient();
  const { resolvedTheme } = useTheme();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="flex flex-col justify-center items-center gap-2 w-screen h-screen">
        <Spinner size="large" show={true} />
      </main>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <AuthProvider>
          <RainbowKitProvider
            showRecentTransactions
            theme={resolvedTheme === "dark" ? darkTheme() : lightTheme()}
            locale={locale === "en" ? "en-US" : "ru-RU"}
          >
            <AuthGuard>{children}</AuthGuard>
          </RainbowKitProvider>
        </AuthProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
