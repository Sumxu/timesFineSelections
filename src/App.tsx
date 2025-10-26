import { lazy, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { ensureWalletConnected } from "@/Hooks/WalletHooks.ts";
import { userAddress } from "@/Store/Store.ts";
import { Spin } from "antd";
const Login = lazy(() => import("@/pages/Login/index.tsx"));
const Home = lazy(() => import("@/pages/Home/index.tsx"));
const OutputList = lazy(() => import("@/pages/OutputList"));

import useWalletListener from "@/Hooks/useWalletListener";
import EnvManager from "@/config/EnvManager";
EnvManager.print();
function App() {
  useWalletListener(); // ✅ 全局持续监听钱包变化
  const walletAddress = userAddress((state) => state.address);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkWallet = async () => {
      if (!walletAddress) {
        await ensureWalletConnected();
      }
      setLoading(false);
    };
    checkWallet();
  }, [walletAddress]);
  if (loading) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }

  return (
    <>
      {walletAddress ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/outputList" element={<OutputList />} />
        </Routes>
      ) : (
        <div className="loding">
          <div>请先连接钱包</div>
        </div>
      )}
    </>
  );
}

export default App;
