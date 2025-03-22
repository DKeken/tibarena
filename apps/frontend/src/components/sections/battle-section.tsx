"use client";

import { ArrowRight, Shield, Swords, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import {
  MotionDiv,
  fadeIn,
  slideInLeft,
  slideInRight,
} from "@/components/ui/motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BattleSection() {
  const t = useTranslations("HomePage");

  const battleActions = [
    {
      icon: <Swords className="h-6 w-6 text-primary" />,
      title: t("battle.actions.strike.title"),
      description: t("battle.actions.strike.description"),
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: t("battle.actions.defense.title"),
      description: t("battle.actions.defense.description"),
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: t("battle.actions.lunge.title"),
      description: t("battle.actions.lunge.description"),
    },
  ];

  const benefits = [
    t("battle.benefits.items.transparency"),
    t("battle.benefits.items.chances"),
    t("battle.benefits.items.winner"),
  ];

  return (
    <Section variant="muted" id="battle-system" className="py-16 sm:py-24">
      <Container className="max-w-screen-xl">
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title={t("battle.title")}
            description={t("battle.description")}
          />
        </MotionDiv>

        <div className="mt-12 p-4 grid gap-10 lg:grid-cols-2">
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">{t("battle.actions.title")}</h3>
            <div className="space-y-4">
              {battleActions.map((action, index) => (
                <Card
                  key={index}
                  className="overflow-hidden transition-all hover:shadow-md"
                >
                  <div className="flex items-start p-4">
                    <div className="rounded-full bg-primary/10 p-3 mr-4 shrink-0">
                      {action.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription className="mt-1 text-sm">
                        {action.description}
                      </CardDescription>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </MotionDiv>

          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold">
                {t("battle.fairplay.title")}
              </h3>
              <Badge variant="outline" className="cursor-help">
                Provably Fair
              </Badge>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  {t("battle.fairplay.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border bg-card shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {t("battle.benefits.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button size="lg" className="group mt-6 w-full sm:w-auto" asChild>
              <Link href="/application">
                {t("battle.cta")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </MotionDiv>
        </div>
      </Container>
    </Section>
  );
}
