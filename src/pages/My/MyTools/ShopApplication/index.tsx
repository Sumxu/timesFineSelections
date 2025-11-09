import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LeftBackHeader from "@/components/LeftBackHeader";
import shopIcon from "@/assets/component/shopIcon.png";
const ShopApplication: React.FC = () => {
  return (
    <div className="shopApplicationPage">
      <LeftBackHeader title="商家入驻" />
      <div className="shopApplicationContentBox">
        <div className="item">
          <div className="itemHeaderOption">
            <img src={shopIcon} className="iconImg" />
            <div className="shopTxt">安品区入驻</div>
          </div>
          <div className="hintTxt">获得安品区产品售卖资格</div>
          <div className="bottomInfoOption">
            <div className="leftTxt">
              <span className="spn1">入驻费用</span>
              <span className="spn2">10.00 TAX</span>
            </div>
            <div className="btnTxt">申请入驻</div>
          </div>
        </div>


        <div className="item">
          <div className="itemHeaderOption">
            <img src={shopIcon} className="iconImg" />
            <div className="shopTxt">优品区入驻</div>
          </div>
          <div className="hintTxt">获得优品区产品售卖资格</div>
          <div className="bottomInfoOption">
            <div className="leftTxt">
              <span className="spn1">入驻费用</span>
              <span className="spn2">20.00 TAX</span>
            </div>
            <div className="btnTxt">申请入驻</div>
          </div>
        </div>


        <div className="item">
          <div className="itemHeaderOption">
            <img src={shopIcon} className="iconImg" />
            <div className="shopTxt">臻品区入驻</div>
          </div>
          <div className="hintTxt">获得安品区、优品区、臻品区产品售卖资格</div>
          <div className="bottomInfoOption">
            <div className="leftTxt">
              <span className="spn1">入驻费用</span>
              <span className="spn2">50.00 TAX</span>
            </div>
            <div className="btnTxt">申请入驻</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShopApplication;
