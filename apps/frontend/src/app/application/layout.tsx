import { Providers } from "../_components/providers";

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
