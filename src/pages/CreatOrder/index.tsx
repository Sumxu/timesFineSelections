import "./index.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LeftBackHeader from "@/components/LeftBackHeader";
import address from "@/assets/component/address.png";
import tusd from "@/assets/home/TUSD.png";
import usdt from "@/assets/home/USDT.png";
import langCheck from "@/assets/lang/langCheck.png";
import langNoCheck from "@/assets/lang/langNoCheck.png";
import { Input } from "antd-mobile";
import { RightOutline } from "antd-mobile-icons";
import { t } from "i18next";
import { storage } from "@/Hooks/useLocalStorage";
import shopPng from "@/assets/component/shopPng.png";
import { Totast } from "@/Hooks/Utils";
interface OrderInfo {
  id: string;
  amount: number;
  specIndex: number;
  // 根据你的实际字段补充
}

interface AddressInfo {
  id: number | string;
  name: string;
  phone: string;
  province: string;
  details: string;
  isDefault: boolean;
}
const CreatOrder: React.FC = () => {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  const [payMethod, setPayMethods] = useState<number>(1); //1usdt 2tusd

  const [addressInfo, setAddressInfo] = useState<AddressInfo>({}); //选中的地址信息

  const navigate = useNavigate();
  //切换购买方式
  const payMethodClick = (payType) => {
    if (payMethod != payType) {
      setPayMethods(payType);
    }
  };
  //提交订单
  const submitOrder = () => {
    //判断地址是否选择了
    if (!addressInfo.id) {
      return Totast("请选择地址", "info");
    }
    navigate('/payResult')
  };
  const checkAddress = () => {
    navigate("/address?type=check");
  };
  useEffect(() => {
    const orderParam = storage.get("orderParam", {});
    const checkAddress = storage.get("checkAddress", {});
    if (orderParam) {
      setOrderInfo(orderParam);
    }
    if (checkAddress) {
      setAddressInfo(checkAddress);
    }
  }, []);
  return (
    <div className="CreatOrderPage">
      <LeftBackHeader title={t("确认订单")}></LeftBackHeader>
      <div className="CreatOrderContent">
        <div className="checkAddressBox" onClick={() => checkAddress()}>
          <div className="iconOption">
            <img src={address} className="icon"></img>
          </div>
          {addressInfo.id ? (
            <div className="addressContent">
              <div className="topOption">
                {addressInfo.name} {addressInfo.phone}
              </div>
              <div className="endOption">
                {addressInfo.province} {addressInfo.city} {addressInfo.area}{" "}
                {addressInfo.details}
              </div>
            </div>
          ) : (
            <div className="content">{t("选择或添加收货地址")}</div>
          )}
          <div className="icon">
            <RightOutline color="#888888" fontSize={14} />
          </div>
        </div>

        <div className="box goodsBox">
          <div className="headerTop">
            <img src={shopPng} className="icon"></img>
            <div className="txt">{orderInfo?.merchantName}</div>
          </div>
          <div className="goodsInfo">
            <img
              src={orderInfo?.items?.[orderInfo.specIndex]?.pic}
              className="goodsImg"
            ></img>
            <div className="rightOption">
              <div className="topOption">
                <div className="txt">{orderInfo?.name}</div>
                <div className="count">x{orderInfo?.specNum}</div>
              </div>

              <div className="price">
                <img src={usdt} className="icon"></img>
                <div className="txt">{orderInfo?.price}</div>
              </div>
              <div className="hintTxt">
                {t("已选规格")}：{orderInfo?.items?.[orderInfo.specIndex]?.name}
              </div>
            </div>
          </div>
          <div className="goodsList">
            <div className="goodsItem">
              <div className="leftOption">{t("配送方式")}：</div>
              <div className="rightOption">
                <div className="txt">{t("快递包邮")}</div>
                <RightOutline color="#888888" fontSize={14} />
              </div>
            </div>

            <div className="goodsItem">
              <div className="leftOption">{t("商品金额")}：</div>
              <div className="rightOption">
                <div className="txt">
                  {orderInfo?.items?.[orderInfo.specIndex]?.price *
                    orderInfo?.specNum}
                </div>
              </div>
            </div>

            <div className="goodsItem">
              <div className="leftOption">{t("补贴积分")}：</div>
              <div className="rightOption">
                <div className="txt txtColor">
                  {orderInfo?.items?.[orderInfo.specIndex]?.integral *
                    orderInfo?.specNum}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="box payFn">
          <div className="hintTxt">{t("支付方式")}</div>
          <div className="payItem payItemBorder">
            <div className="leftOption">
              <img src={usdt} className="icon"></img>
              <span className="price">USDT</span>
            </div>
            <div className="rightOption">
              <span className="spn1">{t("余额")}：1,280.56</span>
              {payMethod == 1 ? (
                <img src={langCheck} className="check"></img>
              ) : (
                <img
                  src={langNoCheck}
                  className="check"
                  onClick={() => payMethodClick(1)}
                ></img>
              )}
            </div>
          </div>

          <div className="payItem payItemTop">
            <div className="leftOption">
              <img src={tusd} className="icon"></img>
              <span className="price">TUSD</span>
            </div>
            <div className="rightOption">
              <span className="spn1">{t("余额")}：1,280.56</span>
              {payMethod == 2 ? (
                <img src={langCheck} className="check"></img>
              ) : (
                <img
                  src={langNoCheck}
                  className="check"
                  onClick={() => payMethodClick(2)}
                ></img>
              )}
            </div>
          </div>
        </div>

        <div className="box remarkBox">
          <div className="label">{t("备注")}</div>
          <div className="value">
            <Input
              placeholder={t("填写备注信息")}
              clearable
              style={{
                "--font-size": "14px",
                "--color": "#fff",
                "--placeholder-color": "rgba(255,255,255,0.35)",
              }}
            ></Input>
          </div>
        </div>
      </div>

      <div className="endFixedBox">
        <div className="leftOption">
          <span className="spn1">{t("需支付")}：</span>
          <span className="spn2">
            {orderInfo?.items?.[orderInfo.specIndex]?.integral *
              orderInfo?.specNum}{" "}
            USDT
          </span>
        </div>
        <div className="rightOption">
          <div className="btn" onClick={() => submitOrder()}>
            {t("提交订单")}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatOrder;
