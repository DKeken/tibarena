import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { polygonZkEvmCardona } from "viem/chains";
import { http } from "wagmi";

export const config = getDefaultConfig({
  appName: "TIB Arena",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains: [polygonZkEvmCardona],
  ssr: true,
  transports: {
    [polygonZkEvmCardona.id]: http("https://rpc.cardona.zkevm-rpc.com"),
  },
});
