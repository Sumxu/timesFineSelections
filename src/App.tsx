import { lazy, useEffect, useState } from "react";
import type { FC } from "react";
import "./App.css";
import { TabBar } from "antd-mobile";
import { ensureWalletConnected } from "@/Hooks/WalletHooks.ts";
import { userAddress } from "@/Store/Store.ts";
import { Spin } from "antd";
const Login = lazy(() => import("@/pages/Login/index.tsx"));
const Nft = lazy(() => import("@/pages/Nft"));
const OutputList = lazy(() => import("@/pages/OutputList"));
const My = lazy(() => import("@/pages/My"));
const Classify = lazy(() => import("@/pages/Classify"));
const Home = lazy(() => import("@/pages/Home"));
const Order = lazy(() => import("@/pages/My/MyTools/Order"));
const OrderDetail = lazy(() => import("@/pages/My/MyTools/OrderDetail"));
const AssetDetails = lazy(() => import("@/pages/My/MyTools/AssetDetails"));
const TaxPledge = lazy(() => import("@/pages/My/MyTools/TaxPledge"));
const TaxList = lazy(() => import("@/pages/My/MyTools/TaxList"));
import useWalletListener from "@/Hooks/useWalletListener";
import EnvManager from "@/config/EnvManager";
import TaBbarBottom from "@/components/TaBbarBottom";
EnvManager.print();
import { Routes, Route, useLocation } from "react-router-dom";
function App() {
  useWalletListener(); // ✅ 全局持续监听钱包变化
  const walletAddress = userAddress((state) => state.address);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { pathname } = location;

  const showSomething = ["/home", "/classify", "/my"].includes(pathname);

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
        <div className="app">
          <div className="body">
            <Routes initialEntries={["/home"]}>
              <Route path="/home" element={<Home />} />
              <Route path="/classify" element={<Classify />} />
              <Route path="/my" element={<My />} />
              <Route path="/order" element={<Order />} />
              <Route path="/orderDetail" element={<OrderDetail />}></Route>
              <Route path="/assetDetails" element={<AssetDetails />}></Route>
              <Route path="/taxPledge" element={<TaxPledge />}></Route>
              <Route path="/taxList" element={<TaxList />}></Route>
            </Routes>
          </div>
          <div className="bottom">{showSomething && <TaBbarBottom />}</div>
        </div>
      ) : (
        <div className="loding">
          <div>请先连接钱包</div>
        </div>
      )}
    </>
  );
}

export default App;
