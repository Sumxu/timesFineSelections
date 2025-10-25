import Erc20 from "./ABI/Erc20.ts";
import SpaceNFTABI from "./ABI/SpaceNFTABI.ts";
import EnvManager from "@/config/EnvManager";
interface ContractItem {
  address: string;
  abi: any[]; // 或具体ABI类型
}
interface ContractMap {
  [key: string]: ContractItem;
}

const Contract: ContractMap = {
  USDTToken: {
    address: EnvManager.contractUsdt,
    abi: Erc20,
  },
  TxtToken: {
    address: EnvManager.contractTAXToken,
    abi: Erc20,
  },
  SpaceNFT: {
    address: EnvManager.contractSpaceNFT,
    abi: SpaceNFTABI
  },
};
// 正式
export default Contract;
