import "./index.scss";
import React, { useEffect, useState } from "react";
import usdt from "@/assets/home/USDT.png";
import shopIcon from "@/assets/component/shopPng.png";
import { t } from "i18next";
import { Calc } from "@/Hooks/calc";

const statusMap: Record<number, { text: string; className: string }> = {
  1: { text: t("已购买"), className: "spn-status-none" },
  2: { text: t("已发货"), className: "spn-status-ing" },
  3: { text: t("已完成"), className: "spn-status-success" },
};

function OrderItem({ onClickDetail, data }) {
  const itemClick = () => {
    onClickDetail(data.id);
  };
  return (
    <div className="order-item">
      <div className="item-header-option">
        <div className="header-left">
         <div className="order-shop-name"><span className="spn1">#</span> {data.orderSn}</div>
        </div>
        <div className="header-status-right">
          <span className={statusMap[data.status]?.className}>
            {statusMap[data.status]?.text}
          </span>
        </div>
      </div>
      <div className="item-order-info-option">
        <img src={data.pic} className="order-info-left"></img>
        <div className="order-info-right">
          <div className="info-txt-option">
            <div className="txt">{data.name}</div>
            <div className="count">x{data.count}</div>
          </div>
          <div className="info-price-option">
            <div className="price-number"> {Calc.toFixed(Calc.mul(data.price, data.count), 4)}</div>
          </div>
          <div className="info-spc">
            {t("规格")}：{data.itemName}{" "}
          </div>
        </div>
      </div>
      <div className="tools-btn-option">
        {data.status != 2 && (
          <div className="btn" onClick={() => itemClick()}>
            {t("去发货")}
          </div>
        )}
      </div>
    </div>
  );
}
export default OrderItem;
