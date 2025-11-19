import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import deafultUserImg from "@/assets/my/deafultUserImg.png";
import copy from "@/assets/my/copy.png";
import logoOut from "@/assets/component/logoOut.png";
import { userAddress } from "@/Store/Store.ts";
import { formatAddress } from "@/Hooks/Utils";
const Header: React.FC = ({ data }) => {
  const navigate = useNavigate();
  const wallertAddress = userAddress().address;
  const logOutClick = () => {
    navigate("/login");
  };
  return (
    <div className="my-header-box">
      <img
        src={logoOut}
        className="logOut-icon"
        onClick={() => logOutClick()}
      ></img>
      <div className="deafult-user-box">
        <div className="user-img-box">
          <img className="userImg-icon" src={deafultUserImg} />
          <div className="user-type-option">{data?.merchantName}</div>
        </div>
        <div className="user-name-option">
          <div className="user-name">{formatAddress(wallertAddress)}</div>
          <img className="copy-img" src={copy}></img>
        </div>
        {(data?.level?.toNumber() ?? 0) !== 0 && (
          <div className="tag-leave-option">LV{data.level.toString()}</div>
        )}
      </div>
    </div>
  );
};
export default Header;
