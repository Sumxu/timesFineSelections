import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import USDTIcon from "@/assets/home/USDT.png";
import moenyIcon from "@/assets/home/moenyIcon.png";
import { t } from "i18next";

const ContentItem = () => {
  return (
    <div className="content-scroll-item">
      <div className="left-img"></div>
      <div className="right-content">
        <div className="title-s">徕芬LE30国庆限定</div>
        <div className="info-bottom">
          <div className="left-bottom">
            {/* <img src={USDTIcon} className="usdt-icon"></img> */}
            <img src={moenyIcon} className="usdt-icon"></img>
            <div className="price-number">193.56</div>
          </div>
          <div className="right-btn">{t('补贴')}100%</div>
        </div>
      </div>
    </div>
  );
};
const ClassifyContent: React.FC = () => {
  return (
    <>
      <div className="classify-option">
        <div className="classify-title">{t('全部商品')}</div>
        <div className="classify-content-scroll">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 9].map((item,index) => {
            return <ContentItem  key={index}/>;
          })}
        </div>
      </div>
    </>
  );
};
export default ClassifyContent;
