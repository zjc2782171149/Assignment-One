"use client";

import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider
} from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
// import ethers from "ethers";

import {
  WagmiProvider,
  useReadContract,
  configureChain,
  useWeb3,
  useCall,
  useWriteContract
} from "wagmi";
import { ethers } from "ethers";
// import { useReadContract } from "wagmi";
import { config } from "../../config/config";
import { wamiProviderConfig } from "./providers";
import rss3 from "../../lib/rss3";
import checkNameAvailability from "../../lib/checkNameAvailability";

import "@rainbow-me/rainbowkit/styles.css";
import InputWithButton from "../../components/Button";
import Contract from "../../components/Contract";

import { Badge } from "@/components/ui/badge";

function Page() {
  const [resData, setResData] = useState("");
  const [domain, setDomain] = useState("");

  // useEffect(() => {
  //   const fetchUserProfile = async (userId) => {
  //     const url = `https://testnet.rss3.io/data/accounts/${userId}/profiles`; // 注意替换为实际的API端点和用户ID

  //     try {
  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json"
  //           // 'Authorization': 'Bearer your_access_token'  // 如果API需要认证，请配置正确的令牌
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();
  //       console.log("rss3响应", data);
  //     } catch (error) {
  //       console.error("Failed to fetch user profile:", error);
  //       return null;
  //     }
  //   };

  //   // 调用函数
  //   fetchUserProfile("vitalik.eth");
  // }, []);

  // 当用户点击按钮或其他交互时触发写入
  const handleSearch = async (value) => {
    setResData("查询中，请稍等……");
    setDomain(value); // 检测该域名
    console.log("输入框信息", value);

    return;

    const url = `https://scan.testnet.rss3.io/api/v2/addresses/${value}`; // 注意替换为实际的API端点和用户ID
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.message) {
        setResData(data.message);
      } else if (!data.message) {
        setResData("该名称已被使用");
      } else {
        setResData("出现未知bug");
      }

      console.log("Testnet合约地址信息", data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setResData("请求失败，失败原因：请求参数不合法");
      return null;
    }
  };

  return (
    <WagmiProvider config={wamiProviderConfig}>
      <RainbowKitProvider>
        <div className="container mx-auto">
          <h1 className="mt-8 text-4xl font-bold text-center">
            Welcome to My First Next.js App
          </h1>

          <div className="flex items-center justify-center mt-10">
            <ConnectButton />
          </div>

          <h1 className="mt-8 text-4xl font-bold text-center">
            Welcome to Next.js with RSS3 Testnet!
          </h1>

          <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
            <InputWithButton searchName={handleSearch} />
          </div>

          <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
            {resData ? (
              <Badge variant="destructive">{resData}</Badge>
            ) : (
              // <p>搜索结果: </p>
              <Badge variant="">请输入名称并点击“查询”按钮</Badge>
              // <p>请输入名称并点击“查询”按钮</p>
            )}
          </div>

          <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
            {/* <p>智能化合约如下</p> */}
            <Contract domain={domain} />
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default Page;
