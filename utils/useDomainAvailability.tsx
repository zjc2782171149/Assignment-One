import { useReadContract } from "wagmi";

const useDomainAvailability = ({ contractAddress, abi, domain }) => {
  const { data, isError, isLoading, status } = useReadContract({
    address: contractAddress,
    abi,
    method: "available",
    args: [domain]
  });

  return {
    data: data,
    isAvailable: data?.[0] ?? false,
    isLoading,
    isError,
    status
  };
};

export default useDomainAvailability;
