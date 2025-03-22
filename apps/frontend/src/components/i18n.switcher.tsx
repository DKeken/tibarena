"use client";

import * as React from "react";
import { useTransition } from "react";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { setUserLocale } from "@/i18n/locale.action";
import { Locale, locales } from "@/i18n/config";

export function I18nSwitcher() {
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const currentIndex = locales.indexOf(currentLocale);
    const nextIndex = (currentIndex + 1) % locales.length;
    const newLocale = locales[nextIndex];

    startTransition(() => {
      setUserLocale(newLocale as Locale);
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      disabled={isPending}
      className="w-[40px] h-[40px]"
    >
      {!isPending && (currentLocale === "en" ? "RU" : "EN")}
      {isPending && <Spinner size="small" />}
    </Button>
  );
}
