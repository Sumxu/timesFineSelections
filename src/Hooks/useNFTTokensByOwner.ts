import { useCallback } from "react";
import { ethers } from "ethers";
import Erc721ABI from "@/Contract/ABI/Erc721ABI";
import EnvManager from "@/config/EnvManager";
import ContractList from "@/Contract/Contract";

interface NFTCall {
  contractAddress: string;
  params?: any[];
}

/**
 * Hook 返回 fetch 方法，动态调用 NFT 合约方法并批量 multicall
 */
export const useNFTMulticall = () => {
  const fetch = useCallback(async (methodName: string, calls: NFTCall[]) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const multicallContract = new ethers.Contract(
        EnvManager.multiCallToken,
        [
          "function aggregate(tuple(address target, bytes callData)[] calls) public view returns (uint256 blockNumber, bytes[] returnData)",
        ],
        provider
      );

      // 构造 callData
      const callDataArray = calls.map(({ contractAddress, params = [] }) => {
        const nftContract = new ethers.Contract(
          contractAddress,
          ContractList["SpaceNFT"].abi,
          provider
        );
        const callData = nftContract.interface.encodeFunctionData(
          methodName,
          params
        );
        return { target: contractAddress, callData };
      });

      const { returnData } = await multicallContract.aggregate(callDataArray);

      // 解码返回值
      const results = returnData.map((data, i) => {
        const { contractAddress } = calls[i];
        const nftContract = new ethers.Contract(
          contractAddress,
          ContractList["SpaceNFT"].abi,
          provider
        );
        const decoded = nftContract.interface.decodeFunctionResult(
          methodName,
          data
        );
        return decoded.length === 1 ? decoded[0] : decoded; // 单值返回第一个，多值返回数组
      });

      return { success: true, data: results };
    } catch (err: any) {
      console.error(err);
      return { success: false, error: err.message || "Multicall failed" };
    }
  }, []);

  return { fetch };
};
