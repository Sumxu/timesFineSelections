import { lazy, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { ensureWalletConnected } from "@/Hooks/WalletHooks.ts";
import { userAddress } from "@/Store/Store.ts";
const Login = lazy(() => import("@/pages/Login/index.tsx"));
const Home = lazy(() => import("@/pages/Home/index.tsx"));
const OutputList = lazy(() => import("@/pages/OutputList"));
import EnvManager from "@/config/EnvManager";

import { ethers } from "ethers";

EnvManager.print();
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkWallet = async () => {
      //判断是否有钱包扩展
      if (!window.ethereum) {
        navigate("/");
      }
      const address = localStorage.getItem("address");
      console.log("address",address)
      if (address) {
        navigate("/Home");
      } else {
        console.log("钱包未连接");
        navigate("/");
      }
    };
    checkWallet();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/outputList" element={<OutputList />} />
      </Routes>
    </>
  );
}

export default App;
