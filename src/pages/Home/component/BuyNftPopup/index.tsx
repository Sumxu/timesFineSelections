import "./index.scss";
import { userAddress } from "@/Store/Store.ts";
import { useEffect, useState } from "react";
import { Input, Spin, Modal, Button } from "antd";
import { BigNumber, ethers } from "ethers";
import { fromWei, Totast, toWei } from "@/Hooks/Utils.ts";
import { t } from "i18next";
import { CloseOutline  } from 'antd-mobile-icons'
import nftIcon from '@/assets/home/nftIcon.png'
import lpIcon from '@/assets/home/lpIcon.png'
import jifenIcon from '@/assets/home/jifenIcon.png'
interface buyNftPopupClass {
  onClose: () => void;
}

function BuyNftPopup(Props: buyNftPopupClass) {
  return (
    <div className="BuyNftPopup">
      <div className="header-top-box">
        <div className="txt">购买NFT</div>
       <div className="icon-close" onClick={()=>Props.onClose()}>
         <CloseOutline fontSize={14}  color='#969696'/>
       </div>
      </div>
      <div className="price-option">3000 USDT</div>
      <div className="get-txt-option">即可获得NFT股东</div>
      <div className="hint-txt">获得权益</div>
      <div className="buy-hint-option">
        <img className="left-icon" src={nftIcon} />
        <div className="right-option">
          <div className="txt-1-item">股东NFT*1张</div>
          <div className="txt-2-item">NFT总产值1000TAX，每日产0.55TAX</div>
        </div>
      </div>
      <div className="buy-hint-option">
        <img className="left-icon" src={jifenIcon} />

        <div className="right-option">
          <div className="txt-1-item">3000积分</div>
          <div className="txt-2-item">600USD+2400TUSD</div>
        </div>
      </div>
      <div className="buy-hint-option">
        <img className="left-icon" src={lpIcon} />
        <div className="right-option">
          <div className="txt-1-item">初始LP占比权</div>
          <div className="txt-2-item">
            获得初始LP底池的占比权（底池LP锁仓三年）
          </div>
        </div>
      </div>
      <div className="need-pay-option">
        <div className="need-txt-1">需支付：3000.00 USDT</div>
        <div className="need-txt-2">余额：8690.32 USDT</div>
      </div>
      <div className="btn-option">确认购买</div>
    </div>
  );
}

export default BuyNftPopup;
