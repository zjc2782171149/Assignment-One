"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { useState, useEffect } from "react";
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
  const [domain, setDomain] = useState("zzzzz.eth");
  const [accountData, setAccountData] = useState();

  // 当用户点击按钮或其他交互时触发写入
  const handleSearch = async (value) => {
    // setResData("查询中，请稍等……");
    setDomain(value); // 检测该域名
    console.log("输入框信息", value);
  };

  useEffect(() => {
    const getENSAddress = async () => {
      const ensAddress = await publicClient.getEnsAddress({
        name: normalize("wevm.eth"),
        universalResolverAddress: ETH.address
      });
      console.log("ensAddress情况", ensAddress);
    };
    getENSAddress();
  }, []);

  // 检测测试网连接状态
  useAccountEffect({
    onConnect(data) {
      console.log("connected", data);
      const { address, chain, chainId } = data;
      const { rpcUrls } = chain;
      console.log("检测测试网连接状态", address, rpcUrls);
      setAccountData(data);
    },
    onDisconnect() {
      console.log("disconnected");
    }
  });

  // const EnsResult = useEnsAddress({
  //   name: normalize("wevm.eth")
  // });
  // console.log("useEnsAddress", EnsResult);

  return (
    <WagmiProvider config={wamiProviderConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="container mx-auto">
            <h1 className="mt-8 text-4xl font-bold text-center">
              请点击以下按钮连接您的钱包
            </h1>

            <div className="flex items-center justify-center mt-10">
              <ConnectButton />
            </div>

            <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
              <InputWithButton searchName={handleSearch} />
            </div>

            <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
              {/* {accountData ? (
                <div>Connected to account: {accountData}</div>
              ) : (
                <div>Connecting...</div>
              )} */}
            </div>

            <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
              {/* <p>智能化合约如下</p> */}
              <h4 className="mt-8 text-4xl font-bold text-center">
                wagmi使用useReadContract的读取状态
              </h4>
              <Contract domain={domain} />
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Page;
