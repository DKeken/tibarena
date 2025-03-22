"use client";

import Link from "next/link";
import { ArrowRight, ArrowDown, Github, Twitter } from "lucide-react";
import { MotionDiv, fadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("HomePage");

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-b from-background via-background/90 to-muted/30 py-24 sm:py-32 h-screen flex flex-col justify-between"
    >
      <Container className="relative z-10 flex-grow flex flex-col justify-center">
        <div className="mx-auto max-w-3xl text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t("title")}
              </span>
              <br />
              <span className="relative">
                {t("hero.heading")}
                <span className="absolute -right-12 -top-6 text-sm font-normal bg-primary/10 px-2 py-1 rounded-md rotate-12">
                  {t("hero.beta")}
                </span>
              </span>
            </h1>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6"
          >
            <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
              {t("hero.subheading")}
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group w-full sm:w-auto px-8 py-6 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              asChild
            >
              <Link href="/application">
                {t("hero.cta")}
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-base font-medium backdrop-blur-sm border-primary/20 hover:bg-primary/5"
              onClick={scrollToFeatures}
            >
              {t("hero.learnMore")}
            </Button>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex justify-center gap-4"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>? {t("hero.onlineUsers")}</span>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <div className="text-sm text-muted-foreground">
              {t("hero.lastUpdated")}
            </div>
          </MotionDiv>
        </div>
      </Container>

      <MotionDiv
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex justify-center pb-8 absolute bottom-0 left-0 right-0 z-10"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToFeatures}
          className="animate-bounce p-2 bg-background/50 backdrop-blur-sm hover:bg-background/80 rounded-full shadow-lg w-12 h-12"
          aria-label="Scroll to features"
        >
          <ArrowDown className="h-6 w-6 text-primary" />
        </Button>
      </MotionDiv>
    </MotionDiv>
  );
}
