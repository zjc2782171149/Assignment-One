import {
  useReadContract,
  useAccount,
  useWalletClient,
  http,
  createConfig
} from "wagmi";

import { abi, address } from "../config/ETHRegistrarController";
import ETH from "../config/ETHRegistrarController.json";

// 配置提供器 start -----------------------------------------------------------------------
import { configureChain, createClient } from "@wagmi/core";
import { mainnet, sepolia } from "wagmi/chains";
import { providers, ethers } from "ethers";
import { useEffect } from "react";
// 配置提供器 end -----------------------------------------------------------------------

const Contract = ({ domain }) => {
  // 配置提供器 start -----------------------------------------------------------------------
  useEffect(() => {
    readContractData();
  }, [domain]);
  const readContractData = async () => {
    try {
      // 使用 wagmi 的 library 来获取 ethers Contract 对象
      const contract = new ethers.Contract(ETH.address, ETH.abi, provider);
      // 创建 ethers 提供器实例
      const provider = new providers.Web3Provider(window.ethereum);
      console.log("合约", contract, window.ethereum);
      // 调用合约的某个函数，例如 available
      const isAvailable = await contract.available("zzzzz.eth");
      console.log("测试是否可行", isAvailable);
    } catch (error) {
      console.log("Failed to read contract data:", error);
    }
  };
  // 配置提供器 end -----------------------------------------------------------------------

  // console.log("待检测域名：", domain);
  const testDomain = "zzzzz.eth";
  const contract = useReadContract({
    abi: ETH.abi,
    address: ETH.address,
    // method: "available",
    functionName: "available",
    args: [testDomain]
  });

  console.log("useReadContract结果", contract);

  const { data, isLoading, isError, isSuccess, status } = contract;

  // const account = useAccount();

  // console.log(account);

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error!</div>;
  console.log(data);

  const isAvailable = data?.[0] ?? false;

  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
      <div className="status">检测状态：{status}</div>
      <div className="status">是否成功：{isSuccess ? "是" : "否"}</div>

      <div>
        {isLoading ? (
          <p>Checking domain availability...</p>
        ) : isError ? (
          <p>Error checking domain availability.</p>
        ) : (
          <p>Domain {isAvailable ? "is" : "is not"} available.</p>
        )}
      </div>
    </div>
  );
};

export default Contract;
