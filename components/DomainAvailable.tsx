import { useReadContract, useAccount } from "wagmi";
// import { ethers } from "ethers";

import { abi, address } from "../config/ETHRegistrarController";
import ETH from "../config/ETHRegistrarController.json";

const domain = "example.eth";

const DomainAvailable = () => {
  // 你需要使用一个前端库（如 ethers.js 或 web3.js）或者自定义的前端钩子（如 useReadContract）来调用合约方法。
  // 以下是使用 ethers.js 调用 available 方法的示例：

  const [isAvailable, setAvailable] = useState(false);

  // 使用你的合约地址和 ABI
  const contractAddress = "0x1DD15613435e374dcEDceDEB275dAe6Fa4DF1A01";
  // const contractABI = [...]; // 用你提供的 JSON 文件中的 ABI 替换这里。

  const checkDomainAvailability = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // 调用 available 方法
      const result = await contract.available(domain);
      setAvailable(result);
    } catch (error) {
      console.error("Error checking domain availability:", error);
    }
  };

  // 在你的组件中，调用 checkDomainAvailability 函数来检查域名是否可用。

  return (
    <div>
      <p>Available: {data ? "Yes" : "No"}</p>
    </div>
  );
};

export default DomainAvailable;
