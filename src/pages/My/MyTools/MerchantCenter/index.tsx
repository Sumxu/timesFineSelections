import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LeftBackHeader from "@/components/LeftBackHeader";
import MerchantDataInfo from "@/pages/My/Components/MerchantDataInfo";
import MerchantGoods from "@/pages/My/Components/MerchantGoods";
import { t } from "i18next";
const MerchantCenter: React.FC = () => {
  return (
    <div className="MerchantCenterPage">
      <LeftBackHeader title={t("商家中心")}></LeftBackHeader>
      <div className="MerchantCenterContent">
        <div className="headerTopBox">
          <div className="shopLogo">
            <div className="logo"></div>
          </div>

          <div className="topInfo">
            <div className="topTxt">
              <span className="spn1">数码优选旗舰店</span>
              <span className="spn2">臻品区商家</span>
            </div>
            <div className="idTxt">ID：88032560</div>
          </div>

          <div className="endOption">
            <div className="leftItem">
              <div className="price">53</div>
              <div className="txt">{t('商品总数')}</div>
            </div>
            <div className="line"></div>
            <div className="rightItem">
              <div className="goodsInfoOption">
                <span className="spn1">安品区：</span>
                <span className="spn2">18</span>
              </div>
              <div className="goodsInfoOption margin14">
                <span className="spn1">臻品区：</span>
                <span className="spn2">35</span>
              </div>
            </div>
          </div>
        </div>
        <MerchantDataInfo></MerchantDataInfo>
        <MerchantGoods></MerchantGoods>
      </div>
    </div>
  );
};
export default MerchantCenter;
