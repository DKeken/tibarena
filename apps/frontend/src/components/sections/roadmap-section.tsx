"use client";

import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { MotionDiv, fadeInUp } from "@/components/ui/motion";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const getRoadmapItems = (t: ReturnType<typeof useTranslations>) => [
  {
    icon: "🏗️",
    title: t("roadmap.items.mvp.title"),
    timeframe: t("roadmap.items.mvp.timeframe"),
    description: t("roadmap.items.mvp.description"),
    items: [
      t("roadmap.items.mvp.items.battle"),
      t("roadmap.items.mvp.items.token"),
      t("roadmap.items.mvp.items.ui"),
      t("roadmap.items.mvp.items.nft"),
    ],
    status: "in-progress",
  },
  {
    icon: "🚀",
    title: t("roadmap.items.launch.title"),
    timeframe: t("roadmap.items.launch.timeframe"),
    description: t("roadmap.items.launch.description"),
    items: [
      t("roadmap.items.launch.items.pvp"),
      t("roadmap.items.launch.items.nft"),
      t("roadmap.items.launch.items.rewards"),
      t("roadmap.items.launch.items.spectator"),
    ],
    status: "upcoming",
  },
  {
    icon: "📱",
    title: t("roadmap.items.scaling.title"),
    timeframe: t("roadmap.items.scaling.timeframe"),
    description: t("roadmap.items.scaling.description"),
    items: [
      t("roadmap.items.scaling.items.mobile"),
      t("roadmap.items.scaling.items.customization"),
      t("roadmap.items.scaling.items.social"),
      t("roadmap.items.scaling.items.mechanics"),
    ],
    status: "upcoming",
  },
  {
    icon: "🌐",
    title: t("roadmap.items.ecosystem.title"),
    timeframe: t("roadmap.items.ecosystem.timeframe"),
    description: t("roadmap.items.ecosystem.description"),
    items: [
      t("roadmap.items.ecosystem.items.dao"),
      t("roadmap.items.ecosystem.items.marketplace"),
      t("roadmap.items.ecosystem.items.rental"),
      t("roadmap.items.ecosystem.items.partnerships"),
    ],
    status: "upcoming",
  },
];

export function RoadmapSection() {
  const t = useTranslations("HomePage");
  const roadmapItems = getRoadmapItems(t);

  return (
    <Section variant="muted" id="roadmap" className="py-16 md:py-24">
      <Container>
        <SectionHeader
          title={t("roadmap.title")}
          description={t("roadmap.description")}
          className="max-w-3xl mx-auto text-center"
        />

        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mt-12 md:mt-16"
        >
          <div className="relative mx-auto max-w-5xl">
            <Timeline>
              {roadmapItems.map((item, index) => (
                <TimelineItem
                  key={index}
                  animated={true}
                  className={cn(
                    "transition-all duration-300 hover:shadow-lg rounded-xl",
                    item.status === "completed" && "bg-primary/5",
                    item.status === "in-progress" && "bg-secondary/10",
                    "p-4 md:p-6",
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                    <h3 className="text-xl md:text-2xl font-bold">
                      {item.title}
                    </h3>
                    <Badge
                      variant={
                        item.status === "completed" ? "default" : "secondary"
                      }
                      className="w-fit text-xs md:text-sm px-3 py-1"
                    >
                      {item.timeframe}
                    </Badge>
                  </div>
                  <p className="mt-2 text-muted-foreground text-sm md:text-base">
                    {item.description}
                  </p>
                  <ul className="mt-4 space-y-2 grid sm:grid-cols-2 gap-2">
                    {item.items.map((listItem, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 group transition-all"
                      >
                        <div className="mt-1.5 max-h-2 max-w-2 min-h-2 min-w-2 rounded-full bg-primary group-hover:scale-125 transition-all" />
                        <span className="text-sm md:text-base">{listItem}</span>
                      </li>
                    ))}
                  </ul>
                  {item.status === "completed" && (
                    <Badge
                      variant="outline"
                      className="mt-4 bg-primary/10 text-primary border-primary/20"
                    >
                      {t("roadmap.completed")}
                    </Badge>
                  )}
                  {item.status === "in-progress" && (
                    <Badge
                      variant="outline"
                      className="mt-4 bg-secondary/10 text-secondary border-secondary/20"
                    >
                      {t("roadmap.inProgress")}
                    </Badge>
                  )}
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </MotionDiv>
      </Container>
    </Section>
  );
}
