"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  WagmiProvider,
  useReadContract,
  configureChain,
  useConfig,
  useAccountEffect,
  useEnsAddress,
  useWalletClient,
  http,
  createConfig
} from "wagmi";
import { wamiProviderConfig } from "../../config/wamiProviderConfig";
import { abi, address } from "../../config/ETHRegistrarController";
import { normalize } from "viem/ens";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputWithButton from "../../components/Button";
import Contract from "../../components/Contract";

import ETH from "../../config/ETHRegistrarController.json";

const queryClient = new QueryClient();

function Page() {
  const [testAddress, setTestAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [isStartCheck, setIsStartCheck] = useState(false);

  // 检测测试网连接状态
  useAccountEffect(
    {
      onConnect(data) {
        console.log("检测测试网连接状态", data);
        // const { address, chain, chainId } = data;
        // const { rpcUrls } = chain;
        // console.log("以太坊地址：", address);
        // console.log("测试网网络地址：", rpcUrls.default.http[0]);

        // setAccountAddress(() => {
        //   return address;
        // });
        // setNetwork(() => {
        //   return rpcUrls.default.http[0] || "当前测试网络异常";
        // });
      },
      onDisconnect() {
        console.log("disconnected");
      }
    },
    []
  );

  // 当用户点击按钮时触发写入
  const handleSearch = useCallback(
    (value) => {
      // 新旧值不同才 setState
      if (value !== testAddress) {
        setTestAddress(value); // 检测该名称
        console.log("输入框信息发生改变，改变后结果为：", value);
      }
    },
    [testAddress]
  );

  const submitForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    handleSearch(data.get("myInput"));
  };

  return (
    <WagmiProvider config={wamiProviderConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="container mx-auto">
            <h3 className="mt-8 text-xl font-bold text-center">
              请点击以下按钮连接您的钱包
            </h3>

            <div className="flex items-center justify-center mt-10">
              <ConnectButton showBalance={true} />
            </div>

            <h3 className="mt-8 text-center">
              <p>当前以太坊地址：{accountAddress || "请在控制台查看"}</p>
              <p>当前测试网网络：{network || "请在控制台查看"}</p>
            </h3>

            <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
              <h3 className="mt-8 text-xl font-bold text-center">
                wagmi使用useReadContract的读取状态
              </h3>
              <div className="flex flex-col items-center justify-center mt-6 mb-6 space-y-2.5">
                <InputWithButton searchName={handleSearch} />
              </div>
            </div>
            {testAddress ? <Contract testAddress={testAddress} /> : <div></div>}
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Page;
