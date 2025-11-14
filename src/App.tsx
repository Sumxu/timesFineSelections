import { lazy, useEffect, useState } from "react";
import "./App.css";
import { Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { t } from "i18next";
import { ensureWalletConnected } from "@/Hooks/WalletHooks";
import { userAddress } from "@/Store/Store";
import useWalletListener from "@/Hooks/useWalletListener";
import TaBbarBottom from "@/components/TaBbarBottom";
import AppRouter from "@/router";
import { isWalletConnected } from "@/Hooks/useWalletStatus";
function App() {
  useWalletListener(); //监听是否切换了钱包和断开钱包
  const navigate = useNavigate();
  const location = useLocation();
  const showSomething = ["/home", "/classify", "/my"].includes(
    location.pathname
  );
  useEffect(() => {
    const check = async () => {
      const account = await isWalletConnected();
      if (account) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    };
    check();
  }, []);
  return (
    <>
      <div className="app">
        <div className="body">
          <AppRouter />
        </div>
        <div className="bottom">{showSomething && <TaBbarBottom />}</div>
      </div>
    </>
  );
}

export default App;
