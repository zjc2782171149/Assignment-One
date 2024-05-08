import {
  useReadContract,
  useAccount,
  useWalletClient,
  http,
  createConfig
} from "wagmi";

import ETH from "../config/ETHRegistrarController.json";

// 配置提供器 start -----------------------------------------------------------------------
import { configureChain, createClient } from "@wagmi/core";
import { mainnet, sepolia } from "wagmi/chains";
import { providers, ethers } from "ethers";
import { useState, useEffect } from "react";
// 配置提供器 end -----------------------------------------------------------------------

import { Badge } from "@/components/ui/badge";

const Contract = (props) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    console.log("名称发生变化，当前要检测的名称为：", props.testAddress);
  }, [props]);

  const contract = useReadContract({
    abi: ETH.abi,
    address: ETH.address,
    functionName: "available",
    args: [props.testAddress]
  });

  useEffect(() => {
    console.log("useReadContract结果", contract);
    const { data, isLoading, isError, status } = contract;
    const isAvailable = data?.[0] ?? false;

    setData(data);
    setIsLoading(isLoading);
    setIsError(isError);
    setStatus(status);
  }, [contract]);

  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
      <div className="status">检测状态：{status}</div>

      <div>
        {isLoading ? (
          <p>检测中...</p>
        ) : isError ? (
          <p>出现未知异常</p>
        ) : (
          <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
            {/* <p>Address {isAvailable ? "is" : "is not"} available.</p> */}
            <p>输入的名称是否已被使用？</p>
            {data ? (
              <Badge>名称未被使用，快来注册吧！</Badge>
            ) : (
              <Badge variant="destructive">名称已被使用，你来晚啦！</Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contract;
