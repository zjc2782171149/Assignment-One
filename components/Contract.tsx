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
  console.log("待检测域名：", domain);
  const contract = useReadContract({
    abi: ETH.abi,
    address: ETH.address,
    functionName: "available",
    args: [domain]
  });

  console.log("useReadContract结果", contract);
  const { data, isLoading, isError, isSuccess, status } = contract;
  const isAvailable = data?.[0] ?? false;

  useEffect(() => {
    console.log("域名发生变化，当前要检测的域名为：", domain);
  }, [domain]);

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
          <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
            <p>Domain {isAvailable ? "is" : "is not"} available.</p>
            <p>data 值为： {data}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contract;
