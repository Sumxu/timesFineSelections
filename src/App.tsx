import { lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ensureWalletConnected } from "@/Hooks/WalletHooks.ts";
import { userAddress } from "@/Store/Store.ts";
const Login = lazy(() => import("@/pages/Login/index.tsx"));
const Home = lazy(() => import("@/pages/Home/index.tsx"));
const OutputList = lazy(() => import("@/pages/OutputList"));
import EnvManager from "@/config/EnvManager";
EnvManager.print()
function App() {
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
