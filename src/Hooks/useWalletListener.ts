import { useEffect, useRef } from "react";
import { ethers } from "ethers";

const useWalletListener = () => {
  const providerRef = useRef(null);

  useEffect(() => {
    if (!window.ethereum) return;
    if (!providerRef.current) {
      providerRef.current = new ethers.providers.Web3Provider(window.ethereum);
    }
    const provider = providerRef.current;
    const handleChange = async () => {
      const accounts = await provider.listAccounts();
      if (accounts.length === 0) {
        console.log("⛔ 钱包断开");
        window.location.reload();
      } else {
        console.log("⛔ 钱包切换");
        window.location.reload();
      }
    };
    // 持续监听 ✅
    window.ethereum.on("accountsChanged", handleChange);
    window.ethereum.on("chainChanged", handleChange);
    console.log("🔄 钱包监听已启动…");
    return () => {
      console.log("🛑 钱包监听已卸载");
      window.ethereum.removeListener("accountsChanged", handleChange);
      window.ethereum.removeListener("chainChanged", handleChange);
    };
  }, []);
};

export default useWalletListener;
