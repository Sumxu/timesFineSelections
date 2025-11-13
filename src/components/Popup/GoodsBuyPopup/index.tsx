import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Popup, Input, Stepper } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import popupHintIcon from "@/assets/popup/popupHintIcon.png";
import usdt from '@/assets/home/USDT.png'
import { t } from "i18next";

const ConversionPopup: React.FC = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [inputNumber, setInputNumber] = useState<string>("");
  const [balaceInputNumber, setBalaceInputNumber] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false); // ✅ 是否获得焦点
  const [isBalanceFocus, setIsBalanceFocus] = useState(false); // ✅ 是否获得焦点
  const onCloseChange = () => {
    setIsShow(false);
  };
  return (
    <>
      <Popup
        visible={isShow}
        onClose={() => {
          onCloseChange();
        }}
      >
        <div className="buyGoods-popup-page">
        <div className="goodsOption">
            <div className="leftImg">

            </div>
            <div className="rightOption">
              <div className="goodsTxt">
                <div className="txt">徕芬LE30国庆限定礼盒款护发套</div>
                <CloseOutline fontSize={14} color="rgba(255,255,255,0.35"></CloseOutline>
              </div>
              <div className="priceOption">
                <img src={usdt} className="usdtIcon"></img>
                <div className="price">193.56</div>
              </div>
              <div className="spceName">
                {t('已选规格')}：LE30橙色 礼盒款
              </div>
            </div>
        </div>
          <div className="specBox">
            <div className="specItem">
              <div className="specName">选择规格</div>
              <div className="specList">
                <div className="specTxt specCheckClass">LE30橙色</div>
                <div className="specTxt">LE30银色</div>
                <div className="specTxt">LE30黑色</div>
              </div>
            </div>
          </div>

          <div className="specBox">
            <div className="specItem">
              <div className="specName">选择类型</div>
              <div className="specList">
                <div className="specTxt specCheckClass">礼盒款</div>
                <div className="specTxt">单品款</div>
              </div>
            </div>
          </div>
          <div className="buyNumberBox">
            <Stepper
              style={{
                "--border-radius": "8px",
                "--height": "36px",
                "--input-background-color": "rgba(255, 255, 255, 0.15)",
                "--input-width": "85px",
                "--button-text-color": "#fff",
                "--button-background-color": "rgba(255, 255, 255, 0.15)",
                "--input-font-color": "#fff",
              }}
              className="stepperClass"
              defaultValue={1}
              onChange={(value) => {
                console.log(value);
              }}
            />
          </div>
          <div className="tag-box">
            <div className="txt-option">{t('可获得补贴积分')}</div>
            <div className="txt-price-option">193.56</div>
          </div>
          <div className="hint-txt-box">
            <div className="hint-txt-option">{t('需支付')}:193.56 USDT</div>
            <div className="hint-txt-option right-option">
              {t('余额')}：8690.32 USDT
            </div>
          </div>
          <div className="btn-submit">{t('确认')}</div>
        </div>
      </Popup>
    </>
  );
};
export default ConversionPopup;
