import { I18nSwitcher } from "@/components/i18n.switcher";
import { ThemeSwitcher } from "@/components/theme.switcher";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { BattleSection } from "@/components/sections/battle-section";
import { TokenomicsSection } from "@/components/sections/tokenomics-section";
import { RoadmapSection } from "@/components/sections/roadmap-section";
import { NftSection } from "@/components/sections/nft-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FooterSection } from "@/components/sections/footer-section";

export default async function Home() {
  return (
    <ScrollArea className="min-h-screen flex flex-col">
      {/* Header Navigation */}
      <div className="fixed top-2 right-2 z-50 flex gap-2 items-center justify-center">
        <ThemeSwitcher />
        <I18nSwitcher />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Battle System */}
      <BattleSection />

      {/* Tokenomics */}
      <TokenomicsSection />

      {/* NFT */}
      <NftSection />

      {/* Roadmap */}
      <RoadmapSection />

      {/* CTA */}
      <CtaSection />

      {/* Footer */}
      <FooterSection />
    </ScrollArea>
  );
}
