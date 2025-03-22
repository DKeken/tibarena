import { ArrowRight, Coins, Crown, Palette, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

const getNftBenefits = (t: ReturnType<typeof useTranslations>) => [
  {
    icon: <Coins className="h-8 w-8" />,
    title: t("nft.benefits.passive.title"),
    description: t("nft.benefits.passive.description"),
  },
  {
    icon: <Crown className="h-8 w-8" />,
    title: t("nft.benefits.exclusive.title"),
    description: t("nft.benefits.exclusive.description"),
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: t("nft.benefits.customization.title"),
    description: t("nft.benefits.customization.description"),
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: t("nft.benefits.rental.title"),
    description: t("nft.benefits.rental.description"),
  },
];

export function NftSection() {
  const t = useTranslations("HomePage");
  const nftBenefits = getNftBenefits(t);

  return (
    <Section id="nft">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Badge className="mb-3">{t("nft.exclusive")}</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("nft.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("nft.description")}
            </p>

            <div className="mt-8 flex gap-4">
              <Button size="lg" className="group" asChild>
                <Link href="/nft">
                  {t("nft.explore")}
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {nftBenefits.map((benefit, index) => (
              <MotionDiv
                key={index}
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 rounded-full bg-primary/10 p-2 w-fit text-primary">
                  {benefit.icon}
                </div>
                <h3 className="font-bold">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </Container>
    </Section>
  );
}
