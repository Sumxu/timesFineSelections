import { useEffect, useState } from "react";
import { storage } from "@/Hooks/useLocalStorage";
import { useNavigate, useLocation } from "react-router-dom";
import { isWalletConnected } from "@/Hooks/useWalletStatus";
import { ensureWalletConnected } from "@/Hooks/WalletHooks";
import { userAddress } from "@/Store/Store";

export function useAuthGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const wallet = userAddress((state) => state.address);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = storage.get("token", "");
      const account = await isWalletConnected();

      // 1) token 不存在 → 去登录
      if (!token) {
        setReady(true);
        if (location.pathname !== "/login") navigate("/login");
        return;
      }

      // 2) 钱包未连接 → 去登录
      if (!account) {
        setReady(true);
        if (location.pathname !== "/login") navigate("/login");
        return;
      }

      // 3) 钱包有 account 但 store 里还没同步地址
      if (!wallet) {
        await ensureWalletConnected();
      }

      setReady(true);

      // 如果现在停在登录页 → 自动跳 home
      if (location.pathname === "/login") navigate("/home");
    };

    init();
  }, []);

  return ready;
}
