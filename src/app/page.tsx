"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { useState, useEffect, useCallback } from "react";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  WagmiProvider,
  useReadContract,
  configureChain,
  useWeb3,
  useCall,
  useWriteContract
} from "wagmi";
import { wamiProviderConfig } from "../../config/wamiProviderConfig";
import { wagmiAbi } from "../../config/ETHRegistrarController";
import { publicClient } from "../../lib/client";
import { normalize } from "viem/ens";
import { useAccount, useConfig, useAccountEffect, useEnsAddress } from "wagmi";

import InputWithButton from "../../components/Button";
import Contract from "../../components/Contract";

import ETH from "../../config/ETHRegistrarController.json";

const queryClient = new QueryClient();

function Page() {
  const [domain, setDomain] = useState("");
  const [network, setNetwork] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [isStartCheck, setIsStartCheck] = useState(false);

  // 直接使用 viem 初始化完的 client 检测 Ens 地址是否可用，但貌似一直不行
  useEffect(() => {
    const getENSAddress = async () => {
      const ensAddress = await publicClient.getEnsAddress({
        name: normalize("wevm.eth"),
        universalResolverAddress: ETH.address
      });
      console.log("ensAddress情况", ensAddress);
    };
    // getENSAddress();
  }, []);

  // 检测测试网连接状态
  useAccountEffect({
    onConnect(data) {
      console.log("检测测试网连接状态", data);
      const { address, chain, chainId } = data;
      const { rpcUrls } = chain;
      changeNetwork(address, rpcUrls);
    },
    onDisconnect() {
      console.log("disconnected");
    }
  });

  const changeNetwork = useCallback((address, rpcUrls) => {
    console.log("检测测试网连接状态", address, rpcUrls);
    setAccountAddress(address);
    setNetwork(rpcUrls.default.http[0] || "当前测试网络异常");
  }, []);

  // 当用户点击按钮时触发写入
  const handleSearch = useCallback(async (value) => {
    // setResData("查询中，请稍等……");
    setDomain(value); // 检测该域名
    console.log("输入框信息", value);
  }, []);

  return (
    <WagmiProvider config={wamiProviderConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="container mx-auto">
            <h3 className="mt-8 text-xl font-bold text-center">
              请点击以下按钮连接您的钱包
            </h3>

            <div className="flex items-center justify-center mt-10">
              <ConnectButton />
            </div>

            <h3 className="mt-8 text-center">
              <p>当前以太坊地址：{accountAddress || "空"}</p>
              <p>当前测试网网络：{network || "空"}</p>
            </h3>

            <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
              <h3 className="mt-8 text-xl font-bold text-center">
                wagmi使用useReadContract的读取状态
              </h3>
              <div className="flex flex-col items-center justify-center mt-6 mb-6 space-y-2.5">
                <InputWithButton searchName={handleSearch} />
              </div>
              <Contract domain={domain} />
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Page;
