"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { useState, useEffect, useCallback } from "react";
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
import { wagmiAbi, abi, address } from "../../config/ETHRegistrarController";
import { publicClient } from "../../lib/client";
import { normalize } from "viem/ens";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import InputWithButton from "../../components/Button";
// import Contract from "../../components/Contract";

import ETH from "../../config/ETHRegistrarController.json";

// 配置提供器 start -----------------------------------------------------------------------
import { createClient } from "@wagmi/core";
import { mainnet, sepolia } from "wagmi/chains";
import { providers, ethers } from "ethers";
// 配置提供器 end -----------------------------------------------------------------------

const queryClient = new QueryClient();

function Page() {
  const [domain, setDomain] = useState("");
  const [network, setNetwork] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [isStartCheck, setIsStartCheck] = useState(false);

  // Contract 的逻辑 start -----------------------------------------------
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [status, setStatus] = useState("pending");

  const contract = useReadContract({
    abi: ETH.abi,
    address: ETH.address,
    functionName: "available",
    args: [domain]
  });

  useEffect(() => {
    console.log("useReadContract结果", contract);
    const { data, isLoading, isError, isSuccess, status } = contract;
    const isAvailable = data?.[0] ?? false;

    setData(data);
    setIsLoading(isLoading);
    setIsError(isError);
    setIsSuccess(isSuccess);
    setIsAvailable(isSuccess);
    setStatus(status);
  }, [contract]);
  // Contract 的逻辑 end -----------------------------------------------

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
  useAccountEffect(
    {
      onConnect(data) {
        console.log("检测测试网连接状态", data);
        const { address, chain, chainId } = data;
        const { rpcUrls } = chain;
        console.log("以太坊地址：", address);
        console.log("测试网网络地址：", rpcUrls.default.http[0]);

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

  useEffect(() => {
    console.log("域名发生变化，当前要检测的域名为：", domain);
  }, [domain]);

  // 当用户点击按钮时触发写入
  const handleSearch = useCallback(async (value) => {
    setDomain(value); // 检测该域名
    console.log("输入框信息", value);
  }, []);

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
              <ConnectButton />
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
                <div className="flex items-center justify-center space-x-2">
                  <form
                    onSubmit={submitForm}
                    className="flex items-center justify-center space-x-2"
                  >
                    <label>
                      <Input
                        placeholder="请输入你要检查的名称"
                        name="myInput"
                        type="text"
                      />
                    </label>
                    <Button type="submit">查询</Button>
                  </form>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
                <div className="status">检测状态：{status}</div>
                <div className="status">
                  是否成功：{isSuccess ? "是" : "否"}
                </div>

                <div>
                  {isLoading ? (
                    <p>Checking domain availability...</p>
                  ) : isError ? (
                    <p>Error checking domain availability.</p>
                  ) : (
                    <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
                      <p>Domain {isAvailable ? "is" : "is not"} available.</p>
                      <p>data 值为： {data}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Page;
