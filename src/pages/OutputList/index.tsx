import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { DownOutline } from "antd-mobile-icons";
import BackHeader from "@/components/BackHeader";
import logoIcon from "@/assets/home/logoIcon.png";
const OutputList: React.FC = () => {
  // 当前钱包地址
  return (
    <>
      <div className="out-put-list-page">
        <BackHeader title="产出记录" />
        <div className="item-box">
          <div className="list-item-header">
            <div className="header-txt">时间</div>
            <div className="header-txt">tokenId</div>
            <div className="header-txt">数量</div>
          </div>
          <div className="list-item">
            <div className="item-txt">2025-09-23 18:32:56</div>
            <div className="item-txt">tokenId</div>
            <div className="item-txt item-txt-right">+0.58</div>
          </div>
           

         
          <div className="list-item">
            <div className="item-txt">2025-09-23 18:32:56</div>
            <div className="item-txt item-txt-right">+0.58</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OutputList;
