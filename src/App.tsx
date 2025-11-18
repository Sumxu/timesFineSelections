import { lazy, useEffect, useState } from "react";
import "./App.css";
import { Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { t } from "i18next";
import { ensureWalletConnected } from "@/Hooks/WalletHooks";
import { userAddress } from "@/Store/Store";
import { storage } from "@/Hooks/useLocalStorage";
import useWalletListener from "@/Hooks/useWalletListener";
import TaBbarBottom from "@/components/TaBbarBottom";
import AppRouter from "@/router";
import { isWalletConnected } from "@/Hooks/useWalletStatus";
import { useRouteRecorder } from "@/hooks/useRouteRecorder";
function App() {
  const { getLastPath } = useRouteRecorder(); //记录跳转的路径
  let path = getLastPath();
  const walletAddress = userAddress((state) => state.address);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const showSomething = ["/home", "/classify", "/my"].includes(
    location.pathname
  );

  useWalletListener({
    onAccountsChanged: (accounts) => {
      console.log("账户切换:", accounts);
      // 可以在这里处理切换逻辑
      storage.remove("token");
      navigate("/login");
    },
    onDisconnected: () => {
      console.log("钱包断开");
      //清空token
      storage.remove("token");
      // 可以在这里处理断开逻辑
      window.location.reload();
    },
    onChainChanged: (chainId) => {
      console.log("链切换:", chainId);
      // 可以在这里处理链切换逻辑
      window.location.reload();
    },
  });

  useEffect(() => {
    const check = async () => {
      const token = storage.get("token", "");
      const account = await isWalletConnected();
      // console.log("token--", token);
      // console.log("account--", account);
      if (!token) {
        return navigate("/login");
      }
      if (account) {
        //如果页面是login就跳转到/home
        //登录状态
        console.log("account", account);
        console.log("walletAddress==app", walletAddress);
        const checkWallet = async () => {
          if (!walletAddress) {
            await ensureWalletConnected();
          }
          setLoading(false);
        };
        checkWallet();
        //store存下token才进行展示
        if (path == "/login") {
          path = "/home";
        }
        navigate(path);
      } else {
        navigate("/login");
      }
    };
    check();
  }, []);
  if (loading) {
    return (
      <div className="loading">
        <Spin />
      </div>
    );
  }
  return (
      <div className="app">
        {walletAddress && (
          <div className="body">
            <AppRouter />
          </div>
        )}
        <div className="bottom">{showSomething && <TaBbarBottom />}</div>
      </div>
  );
}

export default App;
