import React, { useEffect, useState } from "react";
import "./index.scss";
import logo from "@/assets/login/logo.png";
import { SearchOutline } from "antd-mobile-icons";
const Header: React.FC = () => {
  const [isFixed, setIsFixed] = useState<boolean>(false);
  useEffect(() => {
     const scrollContainer = document.querySelector(".home-page-box");

  const handleScroll = () => {
    const scrollTop = scrollContainer?.scrollTop || 0;
    setIsFixed(scrollTop > 10);
  };

  scrollContainer?.addEventListener("scroll", handleScroll);
  return () => scrollContainer?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`header-search-option ${isFixed ? "fixed-header" : ""}`}
    >
      <img src={logo} className="logo-icon" />
      <div className="input-option">
        <SearchOutline fontSize={16} color="#A8AAA9" />
        <span className="spn-1">搜索您想要的商品</span>
      </div>
    </div>
  );
};

export default Header;
