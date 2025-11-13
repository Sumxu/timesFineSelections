import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
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
const CreatOrder: React.FC = () => {
  return (
    <div className="CreatOrderPage">
      <LeftBackHeader title={t("确认订单")}></LeftBackHeader>
      <div className="CreatOrderContent">
         <div className="checkAddressBox">
        <div className="iconOption">
          <img src={address} className="icon"></img>
        </div>
        <div className="content">{t('选择或添加收货地址')}</div>
        <div className="icon">
          <RightOutline color="#888888" fontSize={14} />
        </div>
      </div>

      <div className="box goodsBox">
        <div className="headerTop">
          <div className="icon"></div>
          <div className="txt">徕芬时空优品旗舰店</div>
        </div>
        <div className="goodsInfo">
          <div className="goodsImg"></div>
          <div className="rightOption">
            <div className="topOption">
              <div className="txt">徕芬LE30国庆限定礼盒款护发…</div>
              <div className="count">x1</div>
            </div>

            <div className="price">
              <img src={usdt} className="icon"></img>
              <div className="txt">193.56</div>
            </div>
            <div className="hintTxt">{t('已选规格')}：LE30橙色 礼盒款</div>
          </div>
        </div>
        <div className="goodsList">
          <div className="goodsItem">
            <div className="leftOption">{t('配送方式')}：</div>
            <div className="rightOption">
              <div className="txt">{t('快递包邮')}</div>
              <RightOutline color="#888888" fontSize={14} />
            </div>
          </div>

          <div className="goodsItem">
            <div className="leftOption">{t('商品金额')}：</div>
            <div className="rightOption">
              <div className="txt">193.56</div>
            </div>
          </div>

          <div className="goodsItem">
            <div className="leftOption">{t('运费')}：</div>
            <div className="rightOption">
              <div className="txt">+0.00</div>
            </div>
          </div>

          <div className="goodsItem">
            <div className="leftOption">{t('补贴积分')}：</div>
            <div className="rightOption">
              <div className="txt txtColor">193.56</div>
            </div>
          </div>
        </div>
      </div>

      <div className="box payFn">
        <div className="hintTxt">{t('支付方式')}</div>
        <div className="payItem payItemBorder">
          <div className="leftOption">
            <img src={usdt} className="icon"></img>
            <span className="price">USDT</span>
          </div>
          <div className="rightOption">
            <span className="spn1">{t('余额')}：1,280.56</span>
            <img src={langCheck} className="check"></img>
            <img src={langNoCheck} className="check"></img>
          </div>
        </div>

        <div className="payItem payItemTop">
          <div className="leftOption">
            <img src={usdt} className="icon"></img>
            <span className="price">USDT</span>
          </div>
          <div className="rightOption">
            <span className="spn1">{t('余额')}：1,280.56</span>
            <img src={langCheck} className="check"></img>
            <img src={langNoCheck} className="check"></img>
          </div>
        </div>
      </div>

      <div className="box remarkBox">
        <div className="label">{t('备注')}</div>
        <div className="value">
          <Input
            placeholder={t("填写备注信息")}
              clearable
            style={{
              "--font-size": "14px",
              "--color":"#fff",
              "--placeholder-color": "rgba(255,255,255,0.35)",
            }}
          ></Input>
        </div>
      </div>
      </div>

      <div className="endFixedBox">
        <div className="leftOption">
          <span className="spn1">{t('需支付')}：</span>
          <span className="spn2">193.56 USDT</span>
        </div>
        <div className="rightOption">
          <div className="btn">{t('提交订单')}</div>
        </div>
      </div>
    </div>
  );
};
export default CreatOrder;
