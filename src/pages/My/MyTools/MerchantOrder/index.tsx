import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OrderDetailHeader from "../../Components/OrderDetailHeader";
import copyIcon from "@/assets/my/copy.png";
import address from "@/assets/component/address.png";
import usdt from "@/assets/home/USDT.png";
import { RightOutline } from "antd-mobile-icons";
import car from "@/assets/component/wuliuIcon.png";
import { Calc } from "@/Hooks/calc";
import { Input } from "antd-mobile";
import { Spin } from "antd";
import { t } from "i18next";
import NetworkRequest from "@/Hooks/NetworkRequest.ts";
import shopPng from "@/assets/component/shopPng.png";
import { Totast, copyToClipboard } from "@/Hooks/Utils.ts";
import LeftBackHeader from "@/components/LeftBackHeader";

interface SendInfo {
  logisticsCompany: string;
  trackingNumber: string;
}
export interface OrderDetail {
  id: number;
  orderSn: string;
  name: string;
  itemName: string;
  pic: string;
  price: number;
  integral: number;
  classify: number;
  count: number;
  payType: number;
  status: number;
  remark: string;
  logisticsCompany: string;
  trackingNumber: string;

  receiverName: string;
  receiverPhone: string;
  detailAddress: string;

  merchantName: string;
  merchantAddress: string;

  createTime: string;
}
const Order: React.FC = () => {
    const navigate = useNavigate();
  const payOptions = [
    { id: 1, label: "USDT" },
    { id: 2, label: "USD" },
    { id: 3, label: "TUSD" },
  ];
  const [orderInfo, setOrderInfo] = useState<OrderDetail>({});
  const location = useLocation();
  const [sendInfo, setSendInfo] = useState<SendInfo>({});
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  //获取订单详细信息
  const getPageData = async () => {
    const result = await NetworkRequest({
      Url: "merchant/order/info",
      Data: {
        id,
      },
    });
    if (result.success) {
      setOrderInfo(result.data.data);
    }
  };
  const getPayName = (payMethod) => {
    const filterArray = payOptions.filter((item) => item.id == payMethod);
    if (filterArray.length == 0) return "";
    return filterArray[0].label;
  };
  const addressCopyClick = () => {
    let txt =
      orderInfo.receiverName +
      orderInfo.receiverPhone +
      orderInfo.detailAddress;
    copyToClipboard(txt, t("复制成功"));
  };
  const copyClick = (txt, val) => {
    copyToClipboard(val, txt);
  };
  const saveClick = async () => {
    if(!sendInfo.logisticsCompany){
        return Totast(t('物流公司不能为空'),'info')
    }
     if(!sendInfo.trackingNumber){
        return Totast(t('物流单号不能为空'),'info')
    }
    setBtnLoading(true);
    const result = await NetworkRequest({
      Url: "merchant/order/send",
      Method:"post",
      Data: {
        id: orderInfo.id,
        logisticsCompany: sendInfo.logisticsCompany,
        trackingNumber: sendInfo.trackingNumber,
      },
    });
    setBtnLoading(false);
    if (result.success) {
      navigate(-1);
    }
  };

  useEffect(() => {
    getPageData();
  }, []);
  return (
    <div className="order-detail-page">
      <div className="headerOption">
        <LeftBackHeader title={t("订单发货")}></LeftBackHeader>
      </div>
      <div className="content-box">
        {orderInfo.status != 1 && (
          <div className="wuLiuBox">
            <div className="leftIconOption">
              <img src={car} className="icon"></img>
            </div>
            <div className="contentOption">
              <div className="topContent">
                {orderInfo.logisticsCompany} {orderInfo.trackingNumber}
              </div>
              <div className="bottomOption">{t("物流状态请自行查询")}</div>
            </div>
            <div className="rightOption">
              <img
                className="copyIcon"
                src={copyIcon}
                onClick={() =>
                  copyClick("物流单号复制成功", orderInfo.trackingNumber)
                }
              ></img>
            </div>
          </div>
        )}

        <div className="address-info-box">
          <div className="info-header-option">
            <div className="icon-option">
              <img src={address} className="address-icon"></img>
            </div>
            <div className="right-option">
              <span className="spn-1">{orderInfo.receiverName}</span>
              <span className="spn-2">{orderInfo.receiverPhone}</span>
            </div>
            <img
              src={copyIcon}
              className="copyOption"
              onClick={() => addressCopyClick()}
            ></img>
          </div>
          <div className="addressDetailsOption">{orderInfo.detailAddress}</div>
        </div>
        <div className="goodsInfoBox">
          <div className="goodsItemOption">
            <img src={orderInfo.pic} className="goodsImg"></img>
            <div className="goodsItemRightOption">
              <div className="goodsItemHeader">
                <div className="goodsItemTxt">{orderInfo.name}</div>
                <div className="goodsItemCount">X{orderInfo.count}</div>
              </div>
              <div className="goodsItemPrice">
                <img src={usdt} className="priceIcon"></img>
                <div className="goodsPrice">{orderInfo.price}</div>
              </div>
              <div className="goodsItemSpec">
                {t("已选规格")}：{orderInfo.itemName}
              </div>
            </div>
          </div>
          {orderInfo.price && (
            <div className="goodsItemLineOption">
              <div className="leftOption">{t("支付金额")}：</div>
              <div className="rightOption">
                <div className="rightTxt">
                  {Calc.toFixed(Calc.mul(orderInfo.price, orderInfo.count), 4)}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="order-info-box">
          <div className="item-option">
            <div className="left-item-option">{t("订单编号")}：</div>
            <div className="right-item-option">
              <span className="spn-1">{orderInfo.orderSn}</span>
              <img
                src={copyIcon}
                className="copyIcon"
                onClick={() => copyClick(t("复制成功"), orderInfo.orderSn)}
              ></img>
            </div>
          </div>

          <div className="item-option">
            <div className="left-item-option">{t("支付方式")}：</div>
            <div className="right-item-option">
              <span className="spn-1">{getPayName(orderInfo.payType)}</span>
            </div>
          </div>

          <div className="item-option">
            <div className="left-item-option">{t("下单时间")}：</div>
            <div className="right-item-option">
              <span className="spn-1">{orderInfo.createTime}</span>
            </div>
          </div>
        </div>
        <div className="order-send-box">
          <div className="addressInfoItem addressInfoBottomBorder">
            <div className="leftLabel">{t("物流公司")}</div>
            <div className="rightContent">
              <Input
                placeholder={t("输入物流公司")}
                clearable
                value={sendInfo.logisticsCompany}
                onChange={(val) =>
                  setSendInfo((prev) => ({ ...prev, logisticsCompany: val }))
                }
                style={{
                  "--font-size": "14px",
                  "--color": "#fff",
                  "--placeholder-color": "rgba(255,255,255,0.35)",
                }}
              />
            </div>
          </div>

          <div className="addressInfoItem">
            <div className="leftLabel">{t("物流单号")}</div>
            <div className="rightContent">
              <Input
                placeholder={t("输入物流单号")}
                clearable
                value={sendInfo.trackingNumber}
                onChange={(val) =>
                  setSendInfo((prev) => ({ ...prev, trackingNumber: val }))
                }
                style={{
                  "--font-size": "14px",
                  "--color": "#fff",
                  "--placeholder-color": "rgba(255,255,255,0.35)",
                }}
              />
            </div>
          </div>
        </div>
        <div className="addressBtnBox">
          <div className="addressBtn" onClick={saveClick}>
            {btnLoading ? <Spin /> : t("去发货")}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Order;
