import { useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

import { Badge } from "@/components/ui/badge";

import ETH from "../config/ETHRegistrarController.json";

const ENSContractABI = ETH.abi; // 用您的合约ABI替换这里
const ENSContractAddress = ETH.address; // 用您的合约地址替换这里

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http("https://rpc.rss3.io"),
    [sepolia.id]: http("https://rpc.testnet.rss3.io")
  }
});

function ENSChecker({ domain }) {
  const [resData, setResData] = useState("");
  const [name, setName] = useState("");

  // 使用useReadContract钩子调用合约的available方法
  const { data, isError, isLoading } = useReadContract({
    address: ENSContractAddress,
    abi: ENSContractABI,
    functionName: "available",
    args: [name]
  });

  useEffect(() => {
    const handleSearch = async () => {
      setResData("查询中，请稍等……");
      console.log("输入框信息", domain);

      return;

      const url = `https://scan.testnet.rss3.io/api/v2/addresses/${"0x1DD15613435e374dcEDceDEB275dAe6Fa4DF1A01"}`; // 注意替换为实际的API端点和用户ID
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
    handleSearch();
  }, [domain]);

  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
      {resData ? (
        <Badge variant="destructive">{resData}</Badge>
      ) : (
        // <p>搜索结果: </p>
        <Badge variant="">请输入名称并点击“查询”按钮</Badge>
        // <p>请输入名称并点击“查询”按钮</p>
      )}
    </div>
  );
}

export default ENSChecker;
