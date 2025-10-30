import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import lan from "@/assets/login/lan.png";
import logoName from "@/assets/login/logoName.png";
import logo from "@/assets/login/logo.png";
import { ensureWalletConnected } from "@/Hooks/WalletHooks.ts";
import { Picker } from "antd-mobile";
import i18n, { t } from "i18next";
import { DownOutline } from "antd-mobile-icons";
const Login: React.FC = () => {
  const basicColumns = [
    [
      { label: "简体中文", value: "1" },
      { label: "English", value: "2" },
      { label: "繁体中文", value: "3" },
    ],
  ];
  const [langTxt, setLangTxt] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("1");
  // 当前钱包地址
  const navigate = useNavigate();
  const loginClick = () => {
    //链接钱包 成功后进行跳转
    ensureWalletConnected().then((res) => {
      if (res) {
        navigate("/home");
      }
    });
  };
  // 获取当前语言
  const changeLanguage = (v: string) => {
    const val = v[0];
    let name = "";
    setValue(val);
    if (val == "1") {
      name = "zh";
    }
    if (val == "2") {
      name = "en";
    }
    if (val == "3") {
      name = "zhHant";
    }
    i18n.changeLanguage(name);
    window.localStorage.setItem("lang", name);
    window.location.reload();
  };
  const langClick = () => {
    setVisible(true);
  };
  // 获取当前语言
  const getCurrLang = () => {
    const localLang: string = window.localStorage.getItem("lang") ?? "en";
    i18n.changeLanguage(localLang);
    if (localLang == "zh") {
      setValue("1");
      setLangTxt("简体中文");
    }
    if (localLang == "en") {
      setValue("2");
      setLangTxt("English");
    }
    if (localLang == "zhHant") {
      setValue("3");
      setLangTxt("繁体中文");
    }
  };
  useEffect(() => {
    getCurrLang();
  }, []);
  return (
    <>
      <div
        className={`login-page ${
          value == 2 ? "login-page-en" : "login-page-zh"
        }`}
      >
        <div className="login-header-box">
          <div className="logo-left-option">
            <img src={logo} className="logo-icon"></img>
            <img src={logoName} className="logo-name"></img>
          </div>
          {langTxt && (
            <div className="lan-option">
              <img src={lan} className="lan-icon"></img>
              <div className="lan-txt" onClick={langClick}>
                {langTxt}
              </div>
              <DownOutline color="#fff" />
            </div>
          )}
        </div>
        <div className="btn-bg" onClick={loginClick}></div>
      </div>
      <Picker
        columns={basicColumns}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={value}
        onConfirm={(v) => {
          changeLanguage(v);
        }}
      />
    </>
  );
};
export default Login;
