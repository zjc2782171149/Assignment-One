import { defineChain, createPublicClient, http,createWalletClient,custom  } from 'viem';
import { mainnet } from 'viem/chains'

// 定义 RSS3 Sepolia Testnet 网络
const rss3Testnet = defineChain({
  id: 2331, // Chain ID from the RSS3 documentation
  name: 'RSS3 VSL Sepolia Testnet',
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.rss3.io'], // Public RPC URL from the RSS3 documentation
    },
  },
  blockExplorers: {
    default: {
      name: 'RSS3 Scan',
      url: 'https://scan.testnet.rss3.io', // Block explorer URL from the RSS3 documentation
      txPath: 'transactions',
      addressPath: 'address',
    },
  },
  nativeCurrency: {
    name: 'RSS3',
    symbol: 'RSS3',
    decimals: 18,
  },
});
// 创建 Viem 客户端实例
export const publicClient = createPublicClient({
  chain: rss3Testnet,
  transport: http(),
});

// eg: Metamask
export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!),
})