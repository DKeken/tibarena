import Link from "next/link";
import { Container } from "@/components/ui/container";
import { MotionDiv, fadeIn } from "@/components/ui/motion";
import { useTranslations } from "next-intl";

export function FooterSection() {
  const t = useTranslations("HomePage");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8 md:py-12">
      <Container>
        <MotionDiv
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h2 className="text-xl font-bold">{t("title")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                © {currentYear} {t("footer.copyright")}. {t("footer.rights")}
              </p>
            </div>

            <div className="flex gap-8">
              <div className="space-y-3">
                <p className="text-sm font-medium">
                  {t("footer.menu.product")}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="#features"
                      className="transition-colors hover:text-foreground"
                    >
                      {t("features.title")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#battle-system"
                      className="transition-colors hover:text-foreground"
                    >
                      {t("battle.title")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#tokenomics"
                      className="transition-colors hover:text-foreground"
                    >
                      {t("tokenomics.title")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">
                  {t("footer.menu.company")}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="#roadmap"
                      className="transition-colors hover:text-foreground"
                    >
                      {t("roadmap.title")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#nft"
                      className="transition-colors hover:text-foreground"
                    >
                      NFT
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#usp"
                      className="transition-colors hover:text-foreground"
                    >
                      {t("stats.title")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </MotionDiv>
      </Container>
    </footer>
  );
}
