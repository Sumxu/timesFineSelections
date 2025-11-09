import "./index.scss";
import React, { useEffect, useState } from "react";
import usdt from "@/assets/home/USDT.png";
import shopIcon from "@/assets/home/shopIcon.png";
interface OrderItemClass {
  onClickDetail: () => void;
}

function OrderItem(Props: OrderItemClass) {
  const itemClick = () => {
    Props.onClickDetail();
  };
  return (
    <div className="order-item">
      <div className="item-header-option">
        <div className="header-left">
          <img className="icon" src={shopIcon} />
          <div className="order-shop-name">徕芬时空优品旗舰店</div>
        </div>
        <div className="header-status-right">
          <span className="spn-status-none">待发货</span>
        </div>
      </div>
      <div className="item-order-info-option">
        <div className="order-info-left"></div>
        <div className="order-info-right">
          <div className="info-txt-option">
            <div className="txt">徕芬LE30国庆限定礼盒款护</div>
            <div className="count">x1</div>
          </div>
          <div className="info-price-option">
            <img src={usdt} className="icon"></img>
            <div className="price-number">193.56</div>
          </div>
          <div className="info-spc">已选规格：LE30橙色 礼盒款</div>
        </div>
      </div>
      <div className="logistics-information">
        <span className="spn-label">实付款:</span>
        <span className="spn-value">193.56 USDT</span>
      </div>
      <div className="tools-btn-option">
        <div className="btn" onClick={() => itemClick()}>
          订单详情
        </div>
        <div className="btn">查看物流</div>
      </div>
    </div>
  );
}
export default OrderItem;
