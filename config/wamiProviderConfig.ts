import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// export const wamiProviderConfig = createConfig({
//   chains: [mainnet, sepolia],
//   transports: {
//     [mainnet.id]: http("https://rpc.rss3.io"),
//     [sepolia.id]: http("https://rpc.testnet.rss3.io")
//   }
// });

export const wamiProviderConfig = getDefaultConfig({
  appName: 'zjc_first_wallet',
  projectId: 'd148bbd01137e6968a16cd6878703b2d',
  chains: [mainnet],
  transports: {
    [mainnet.id]: http("https://rpc.rss3.io"),
    [sepolia.id]: http("https://rpc.testnet.rss3.io")
  },
})