import { Activity, Clock, Scale, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";
import { Stats, StatsItem } from "@/components/ui/stats";
import { useTranslations } from "next-intl";

export function StatsSection() {
  const t = useTranslations("HomePage");

  return (
    <Section variant="muted" id="usp">
      <Container>
        <SectionHeader
          title={t("stats.title")}
          description={t("stats.description")}
        />

        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12"
        >
          <Stats className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <MotionDiv variants={fadeInUp} transition={{ duration: 0.4 }}>
              <StatsItem
                icon={<Clock className="h-10 w-10" />}
                value={t("stats.items.battle.value")}
                label={t("stats.items.battle.label")}
              />
            </MotionDiv>

            <MotionDiv
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <StatsItem
                icon={<Scale className="h-10 w-10" />}
                value={t("stats.items.fair.value")}
                label={t("stats.items.fair.label")}
              />
            </MotionDiv>

            <MotionDiv
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <StatsItem
                icon={<Users className="h-10 w-10" />}
                value={t("stats.items.spectator.value")}
                label={t("stats.items.spectator.label")}
              />
            </MotionDiv>

            <MotionDiv
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <StatsItem
                icon={<Activity className="h-10 w-10" />}
                value={t("stats.items.rewards.value")}
                label={t("stats.items.rewards.label")}
              />
            </MotionDiv>
          </Stats>
        </MotionDiv>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold">
              {t("stats.features.gameplay.title")}
            </h3>
            <p className="mt-2 text-muted-foreground">
              {t("stats.features.gameplay.description")}
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold">
              {t("stats.features.fair.title")}
            </h3>
            <p className="mt-2 text-muted-foreground">
              {t("stats.features.fair.description")}
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold">
              {t("stats.features.social.title")}
            </h3>
            <p className="mt-2 text-muted-foreground">
              {t("stats.features.social.description")}
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold">
              {t("stats.features.surprise.title")}
            </h3>
            <p className="mt-2 text-muted-foreground">
              {t("stats.features.surprise.description")}
            </p>
          </MotionDiv>
        </div>
      </Container>
    </Section>
  );
}
