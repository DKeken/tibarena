"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeSwitcher } from "./theme.switcher";
import { useAuthStatus } from "./auth.provider";
import { I18nSwitcher } from "./i18n.switcher";
import { Spinner } from "@/components/ui/spinner";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { authStatus, isLoading } = useAuthStatus();

  if (isLoading) {
    return (
      <main className="flex flex-col justify-center items-center gap-2 w-screen h-screen">
        <Spinner size="large" show={true} />
      </main>
    );
  }

  if (authStatus === "unauthenticated") {
    return (
      <main className="flex flex-col justify-center items-center gap-2 w-screen h-screen">
        <ConnectButton />
        <div className="flex items-center justify-center gap-2">
          <ThemeSwitcher />
          <I18nSwitcher />
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center gap-2 w-screen h-screen">
      <div className="flex items-center justify-center gap-2">
        <ThemeSwitcher />
        <I18nSwitcher />
        <ConnectButton />
      </div>
      {children}
    </main>
  );
}
