import "./index.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import paySuccess from "@/assets/img/paySuccess.png";
import usdt from "@/assets/home/USDT.png";
import LeftBackHeader from "@/components/LeftBackHeader";
import { t } from "i18next";
const PayResult: React.FC = () => {
  const navigate = useNavigate();
  const goPath = (path) => {
    navigate(path);
  };
  return (
    <div className="PayResultPage">
      <LeftBackHeader title={t("支付结果")}></LeftBackHeader>
      <div className="paySuccessBox">
        <div className="iconBox">
          <img src={paySuccess} className="icon"></img>
        </div>
        <div className="payTxt">{t("支付成功")}</div>
        <div className="payPrice">
          <img src={usdt} className="icon"></img>
          <span className="spn1">193.56</span>
        </div>
        <div className="payInfoBox">
          <div className="payInfoItem">
            <span className="spn1">{t("商品金额")}：</span>
            <span className="spn1 color1">193.56</span>
          </div>
          <div className="payInfoItem">
            <span className="spn1">{t("补贴积分")}：</span>
            <span className="spn1 color1">193.56</span>
          </div>
          <div className="payInfoItem">
            <span className="spn1">{t("支付方式")}：</span>
            <span className="spn1 color1">USDT</span>
          </div>
        </div>
      </div>
      <div className="btnList">
        <div className="btn bg1" onClick={()=>goPath('/home')}>{t("返回首页")}</div>
        <div className="btn bg2" onClick={()=>goPath('/order')}>{t("查看订单")}</div>
      </div>
    </div>
  );
};
export default PayResult;
