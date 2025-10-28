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
import useWalletListener from "@/Hooks/useWalletListener";
import EnvManager from "@/config/EnvManager";
import styles from './App.css'
EnvManager.print();
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  MemoryRouter as Router,
} from "react-router-dom";
const Bottom: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    history.push(value);
  };

  const tabs = [
    {
      key: "/home",
      title: "首页",
     icon: <AppOutline />,
    },
    {
      key: "/classify",
      title: "分类",
       icon: <UnorderedListOutline />,
    },
    {
      key: "/my",
      title: "我的",
       icon: <MessageOutline />,
    },
  ];

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

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
        <Router initialEntries={["/home"]}>
          <div className={styles.app}>
            <div className={styles.body}>
              <Switch>
                <Route exact path="/home">
                  <Home />
                </Route>
                <Route exact path="/classify">
                  <Classify />
                </Route>
                <Route exact path="/my">
                  <My />
                </Route>
              </Switch>
            </div>
            <div className={styles.bottom}>
              <Bottom />
            </div>
          </div>
        </Router>
      ) : (
        <div className="loding">
          <div>请先连接钱包</div>
        </div>
      )}
    </>
  );
}

export default App;
