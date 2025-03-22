import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { MotionDiv, fadeInUp } from "@/components/ui/motion";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

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
  },
];

export function RoadmapSection() {
  const t = useTranslations("HomePage");
  const roadmapItems = getRoadmapItems(t);

  return (
    <Section variant="muted" id="roadmap">
      <Container>
        <SectionHeader
          title={t("roadmap.title")}
          description={t("roadmap.description")}
        />

        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <div className="relative mx-auto max-w-4xl">
            <Timeline>
              {roadmapItems.map((item, index) => (
                <TimelineItem
                  key={index}
                  icon={<span className="text-sm">{item.icon}</span>}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <Badge variant="secondary">{item.timeframe}</Badge>
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    {item.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.items.map((listItem, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{listItem}</span>
                      </li>
                    ))}
                  </ul>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </MotionDiv>
      </Container>
    </Section>
  );
}
