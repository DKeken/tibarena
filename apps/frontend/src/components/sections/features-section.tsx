import { Shield, Swords, Trophy, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";
import { useTranslations } from "next-intl";

const getFeatures = (t: ReturnType<typeof useTranslations>) => [
  {
    icon: <Swords className="h-10 w-10" />,
    title: t("features.items.battles.title"),
    description: t("features.items.battles.description"),
    content: t("features.items.battles.content"),
  },
  {
    icon: <Trophy className="h-10 w-10" />,
    title: t("features.items.tokens.title"),
    description: t("features.items.tokens.description"),
    content: t("features.items.tokens.content"),
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: t("features.items.nft.title"),
    description: t("features.items.nft.description"),
    content: t("features.items.nft.content"),
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: t("features.items.chances.title"),
    description: t("features.items.chances.description"),
    content: t("features.items.chances.content"),
  },
];

export function FeaturesSection() {
  const t = useTranslations("HomePage");
  const features = getFeatures(t);

  return (
    <Section id="features" className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          title={t("features.title")}
          description={t("features.description")}
          className="mb-12"
        />

        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 p-4"
        >
          {features.map((feature, index) => (
            <MotionDiv
              key={index}
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full border-none bg-background/50 backdrop-blur-sm shadow-md transition-all hover:shadow-xl hover:bg-background/80 hover:scale-105 group">
                <CardHeader>
                  <div className="mb-4 rounded-xl bg-primary/10 p-3 w-fit text-primary group-hover:bg-primary/20 transition-all">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80 mt-2">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.content}
                  </p>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </MotionDiv>
      </Container>
    </Section>
  );
}
