import { http, createConfig } from 'wagmi'
// import { mainnet, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

import { rss3Sepolia } from "viem/chains";
export const wamiProviderConfig = createConfig({
  chains: [rss3Sepolia],
  transports: {
    [rss3Sepolia.id]: http(),
  },
});

// export const wamiProviderConfig = getDefaultConfig({
//   appName: 'zjc_first_wallet',
//   projectId: 'd148bbd01137e6968a16cd6878703b2d',
//   chains: [mainnet],
//   transports: {
//     [mainnet.id]: http("https://rpc.rss3.io"),
//     [sepolia.id]: http("https://rpc.testnet.rss3.io")
//   },
// })