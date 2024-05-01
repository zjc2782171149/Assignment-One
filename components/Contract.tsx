import { useReadContract, useAccount } from "wagmi";
// import { ethers } from "ethers";

import { abi, address } from "../config/ETHRegistrarController";
import ETH from "../config/ETHRegistrarController.json";

const Contract = ({ domain }) => {
  // console.log(ETH);
  console.log("待检测域名：", domain);
  const contract = useReadContract({
    abi: ETH.abi,
    address: ETH.address,
    method: "available",
    // functionName: "available",
    args: [domain]
  });

  console.log("useReadContract结果", contract);

  const { data, isLoading, isError, isSuccess, status } = contract;

  // const account = useAccount();

  // console.log(account);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  console.log(data);

  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-2.5">
      <p>
        {domain} 加载状态: {status}, 是否加载成功: {isSuccess}
      </p>
      <p>是否已被使用: {data ? "Yes" : "No"}</p>
    </div>
  );
};

export default Contract;
