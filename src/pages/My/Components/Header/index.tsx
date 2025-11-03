import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import deafultUserImg from "@/assets/my/deafultUserImg.png";
import copy from "@/assets/my/copy.png";
const Header: React.FC = () => {
  return (
    <>
      <div className="my-header-box">
        <div className="logOut-icon">
          
        </div>
        <div className="deafult-user-box">
          <div className="user-img-box">
            <img className="userImg-icon" src={deafultUserImg} />
            <div className="user-type-option">臻品区商家</div>
          </div>
          <div className="user-name-option">
            <div className="user-name">0x325…0086</div>
            <img className="copy-img" src={copy}></img>
          </div>
          <div className="tag-leave-option">LV3</div>
        </div>
      </div>
    </>
  );
};
export default Header;
