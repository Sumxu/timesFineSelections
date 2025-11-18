import { Spin } from "antd";
import { useLocation } from "react-router-dom";
import TaBbarBottom from "@/components/TaBbarBottom";
import AppRouter from "@/router";
import useWalletListener from "@/Hooks/useWalletListener";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { userAddress } from "@/Store/Store";
import { storage } from "@/Hooks/useLocalStorage";

function App() {
  const ready = useAuthGuard();
  const location = useLocation();
  const walletAddress = userAddress((s) => s.address);
  const showTab = ["/home", "/classify", "/my"].includes(location.pathname);
  // 统一监听钱包事件
  useWalletListener({
    onAccountsChanged: () => {
      storage.remove("token");
      window.location.href = "/login"; // 更保险，不会出现 React 状态问题
    },
    onDisconnected: () => {
      storage.remove("token");
      window.location.href = "/login";
    },
    onChainChanged: () => {
      window.location.reload();
    },
  });

  if (!ready) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="body">
        <AppRouter />
      </div>
      <div className="bottom">
        {walletAddress && showTab && <TaBbarBottom />}
      </div>
    </div>
  );
}

export default App;
