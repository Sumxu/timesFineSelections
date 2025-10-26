// src/config/EnvConfigProvider.ts

/** 环境配置接口（已去掉 VITE_ 前缀，字段名更友好） */
export interface EnvConfig {
  apiBase: string;
  contractPool: string;
  contractUsdt: string;
  contractCa: string;
  contractIdoPool: string;
  chainId: string;
  rpcUrl: string;
  blockExplorerUrls: string;
  chainName: string;
}

/** 环境配置提供类：集中维护 dev / prod 原始值 */
export default class EnvConfigProvider {
  /** 开发环境配置（测试网） */
  static getDevConfig(): EnvConfig {
    return {
      apiBase: "https://v1.clkapp.cc/",
      contractSpaceNFT: "0x263D57668c2fFE0848171533DC510EAc70140e5a",
      contractUsdt: "0x2Cba653C50e9A2e97411104d1460EBFAECE50E9C",
      contractTAXToken: "0xA731812CF8bAb136ACEa9835A2e54493a3A1f2e2",
      chainId: "0x61",
      multiCallToken: "0xcA11bde05977b3631167028862bE2a173976CA11",
      rpcUrl: "https://bsc-testnet-rpc.publicnode.com/",
      blockExplorerUrls: "http://143.92.39.28:9030/api",
      chainName: "BNB Smart Chain Mainnet",
    };
  }
  /** 生产环境配置（主网） */
  static getProdConfig(): EnvConfig {
    return {
      apiBase: "https://api.taxshop.plus/dapp",
      contractSpaceNFT: "0x764eEaB717b68056C02a75677C784b98e54Fc042",
      multiCallToken: "0xcA11bde05977b3631167028862bE2a173976CA11",
      contractUsdt: "0x55d398326f99059fF775485246999027B3197955",
      contractTAXToken: "0xFcB022Fc4a72E3Ce5bCA867BB888fc88b03e9e81",
      chainId: "0x38",
      rpcUrl: "https://bsc-dataseed.binance.org/",
      blockExplorerUrls: "https://bscscan.com",
      chainName: "BNB Smart Chain Mainnet",
    };
  }
}
