import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { MotionDiv, fadeInUp } from "@/components/ui/motion";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

// Tokenomics data
const getTokenDistribution = (t: ReturnType<typeof useTranslations>) => [
  {
    label: t("tokenomics.distribution.rewards"),
    value: 50,
    color: "bg-primary",
  },
  {
    label: t("tokenomics.distribution.marketing"),
    value: 20,
    color: "bg-blue-500",
  },
  {
    label: t("tokenomics.distribution.team"),
    value: 15,
    color: "bg-purple-500",
  },
  {
    label: t("tokenomics.distribution.partnerships"),
    value: 10,
    color: "bg-green-500",
  },
  {
    label: t("tokenomics.distribution.community"),
    value: 5,
    color: "bg-amber-500",
  },
];

// Commission distribution
const getCommissionDistribution = (t: ReturnType<typeof useTranslations>) => [
  { label: t("tokenomics.commission.nft"), value: 2, color: "bg-primary" },
  {
    label: t("tokenomics.commission.liquidity"),
    value: 1,
    color: "bg-blue-500",
  },
  {
    label: t("tokenomics.commission.development"),
    value: 1,
    color: "bg-purple-500",
  },
];

export function TokenomicsSection() {
  const t = useTranslations("HomePage");
  const tokenDistribution = getTokenDistribution(t);
  const commissionDistribution = getCommissionDistribution(t);

  return (
    <Section id="tokenomics">
      <Container>
        <SectionHeader
          title={t("tokenomics.title")}
          description={t("tokenomics.description")}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-bold">
                {t("tokenomics.token.title")}
              </h3>
              <div className="mb-4 h-6 w-full overflow-hidden rounded-full bg-muted">
                {tokenDistribution.map((item, index) => (
                  <div
                    key={index}
                    className={`h-full float-left ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  />
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {tokenDistribution.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${item.color}`} />
                      <span>{item.label}</span>
                    </div>
                    <Badge variant="secondary">{item.value}%</Badge>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                {t("tokenomics.token.supply")}
              </p>
            </div>
          </MotionDiv>

          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-bold">
                {t("tokenomics.commission.title")}
              </h3>
              <div className="mb-4 flex h-24 w-full items-center justify-center gap-2">
                {commissionDistribution.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex aspect-square h-full items-center justify-center rounded-full text-primary-foreground"
                    style={{
                      background: `conic-gradient(${
                        index === 0
                          ? "#0091ff"
                          : index === 1
                            ? "#3b82f6"
                            : "#a855f7"
                      } ${(item.value / 4) * 360}deg, transparent 0)`,
                    }}
                  >
                    <div className="flex h-3/4 w-3/4 items-center justify-center rounded-full bg-card">
                      <span className="text-lg font-bold">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {commissionDistribution.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${item.color}`} />
                      <span>{item.label}</span>
                    </div>
                    <Badge variant="secondary">{item.value}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </MotionDiv>
        </div>
      </Container>
    </Section>
  );
}
