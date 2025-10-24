import { lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ensureWalletConnected } from "@/Hooks/WalletHooks.ts";
import { userAddress } from "@/Store/Store.ts";
const Home = lazy(() => import("@/pages/Home/index.tsx"));
import EnvManager from "@/config/EnvManager";
EnvManager.print()
function App() {
  return (
    <>
       
    </>
  );
}

export default App;
