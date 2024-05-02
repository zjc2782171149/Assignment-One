"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet
} from "@rainbow-me/rainbowkit/wallets";
import { arbitrum, base, optimism, polygon } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import { WagmiConfig } from "@wagmi/core";
import { publicProvider } from "wagmi/providers/public";

const { wallets } = getDefaultWallets();

// 假设您有一个 Infura 项目ID，您需要将其替换到下面的位置
import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
const infuraProjectId = "d148bbd01137e6968a16cd6878703b2d";
export const wamiProviderConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http("https://rpc.rss3.io"),
    [sepolia.id]: http("https://rpc.testnet.rss3.io")
  }
});

// export const wamiProviderConfig = getDefaultConfig({
//   appName: "zjc_first_wallet",
//   projectId: "d148bbd01137e6968a16cd6878703b2d",
//   wallets: [
//     ...wallets,
//     {
//       groupName: "Other",
//       wallets: [argentWallet, trustWallet, ledgerWallet]
//     }
//   ],
//   chains: [
//     mainnet,
//     polygon,
//     optimism,
//     arbitrum,
//     base,
//     ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : [])
//   ],
//   ssr: true
// });

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wamiProviderConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
