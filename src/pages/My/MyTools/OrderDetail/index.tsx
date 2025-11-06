import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OrderDetailHeader from "../../Components/OrderDetailHeader";
import copyIcon from "@/assets/my/copy.png";
import address from "@/assets/component/address.png";
import usdt from "@/assets/home/USDT.png";
import { RightOutline } from "antd-mobile-icons";
const Order: React.FC = () => {
  return (
    <>
      <div className="order-detail-page">
        <OrderDetailHeader></OrderDetailHeader>
        <div className="content-box">
          <div className="wuLiuBox">
            <div className="leftIconOption">
              <div className="icon"></div>
            </div>
            <div className="contentOption">
              <div className="topContent">中通快递 78950999230400</div>
              <div className="bottomOption">物流状态请自行查询</div>
            </div>
            <div className="rightOption">
              <img className="copyIcon" src={copyIcon}></img>
            </div>
          </div>

          <div className="address-info-box">
            <div className="info-header-option">
              <div className="icon-option">
                <img src={address} className="address-icon"></img>
              </div>
              <div className="right-option">
                <span className="spn-1">王传福</span>
                <span className="spn-2">18690088588</span>
              </div>
            </div>
            <div className="addressDetailsOption">
              湖南省长沙市岳麓区 麓谷街道和馨园社区西湖雅苑32栋2008号麓谷街道
            </div>
          </div>

          <div className="goodsInfoBox">
            <div className="headerTopOption">
              <div className="Icon"></div>
              <div className="txt">徕芬时空优品旗舰店</div>
            </div>
            <div className="goodsItemOption">
              <div className="goodsImg"></div>
              <div className="goodsItemRightOption">
                <div className="goodsItemHeader">
                  <div className="goodsItemTxt">徕芬LE30国庆限定礼盒款护发</div>
                  <div className="goodsItemCount">X1</div>
                </div>
                <div className="goodsItemPrice">
                  <img src={usdt} className="priceIcon"></img>
                  <div className="goodsPrice">193.56</div>
                </div>
                <div className="goodsItemSpec">已选规格：LE30橙色 礼盒款</div>
              </div>
            </div>
            <div className="goodsItemLineOption">
              <div className="leftOption">配送方式：</div>
              <div className="rightOption">
                <div className="rightTxt">快递包邮</div>
                <RightOutline color="#888888" fontSize={14} />
              </div>
            </div>
            <div className="goodsItemLineOption">
              <div className="leftOption">商品金额：</div>
              <div className="rightOption">
                <div className="rightTxt">193.56</div>
              </div>
            </div>

            <div className="goodsItemLineOption">
              <div className="leftOption">运费：</div>
              <div className="rightOption">
                <div className="rightTxt">+0.00</div>
              </div>
            </div>

            <div className="goodsItemLineOption">
              <div className="leftOption">补贴积分：</div>
              <div className="rightOption">
                <div className="rightTxt rightTxtOrige">193.56</div>
              </div>
            </div>
          </div>

          <div className="order-info-box">
            <div className="item-option">
              <div className="left-item-option">订单编号：</div>
              <div className="right-item-option">
                <span className="spn-1">202509231603830023</span>
                <img src={copyIcon} className="copyIcon"></img>
              </div>
            </div>

            <div className="item-option">
              <div className="left-item-option">支付方式：</div>
              <div className="right-item-option">
                <span className="spn-1">USDT</span>
              </div>
            </div>

            <div className="item-option">
              <div className="left-item-option">订单编号：</div>
              <div className="right-item-option">
                <span className="spn-1">2025-09-23 18:56:32</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Order;
