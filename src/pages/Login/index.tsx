import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ensureWalletConnected } from "@/Hooks/WalletHooks.ts";
import { userAddress } from "@/Store/Store.ts";
import { t } from "i18next";

const Login: React.FC = () => {
  // 当前钱包地址
  const navigate = useNavigate();
  const loginClick = () => {
    navigate("/home");
  };
  return (
    <>
      <div className="login-page">
        <div className="btn-bg" onClick={loginClick}></div>
      </div>
    </>
  );
};
export default Login;
