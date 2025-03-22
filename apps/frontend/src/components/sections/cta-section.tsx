import { ArrowRight, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { MotionDiv, fadeIn } from "@/components/ui/motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function CtaSection() {
  const t = useTranslations("HomePage");

  return (
    <Section>
      <Container>
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-background p-8 sm:p-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("cta.description")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto group" asChild>
                <Link href="/application">
                  <Users className="mr-2" />
                  {t("cta.button")}
                </Link>
              </Button>
              <Button
                size="lg"
                className="w-full sm:w-auto group"
                variant="outline"
                asChild
              >
                <Link href="/leaderboard">
                  <Trophy className="mr-2" />
                  {t("cta.leaderboard")}
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </MotionDiv>
      </Container>
    </Section>
  );
}
