import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Popup, Input } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import { t } from "i18next";
import popupHintIcon from "@/assets/popup/popupHintIcon.png";
const ConversionPopup: React.FC = ({isShow,onClose}) => {
  const [inputNumber, setInputNumber] = useState<string>("");
  const [balaceInputNumber, setBalaceInputNumber] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false); // ✅ 是否获得焦点
  const [isBalanceFocus, setIsBalanceFocus] = useState(false); // ✅ 是否获得焦点
  const onCloseChange = () => {
     onClose();
  };
  return (
    <>
      <Popup
        visible={isShow}
        onClose={() => {
          onCloseChange();
        }}
      >
        <div className="my-apply-store-popup-page">
          <div className="header-option">
            <div className="title">{t("申请入驻安品区")}</div>
            <div className="close-icon" onClick={() => onCloseChange()}>
              <CloseOutline fontSize={12} color="#969797" />
            </div>
          </div>
          <div className="payPriceBox">
              <div className="priceTxt">10.00 TAX</div>
              <div className="priceHintTxt">即可入驻安品区</div>
          </div>

          <div className="input-box">
            <div className="input-hint-txt-option">
              <div className="txt-option">{t('店铺名称')}:</div>
            </div>
            <div
              className={`input-option ${isBalanceFocus ? "input-focus" : ""}`}
            >
              <Input
                placeholder={t('输入店铺名称')}
                value={balaceInputNumber}
                onChange={(val) => {
                  setBalaceInputNumber(val);
                }}
                onFocus={() => setIsBalanceFocus(true)} // ✅ 获得焦点
                onBlur={() => setIsBalanceFocus(false)} // ✅ 失去焦点
                clearable
                className="input-class"
              />
            </div>
          </div>

          <div className="hint-txt-box">
            <div className="hint-txt-option">{t('需支付')}0.00TAX:</div>
            <div className="hint-txt-option right-txt">{t('余额')}0.00TAX</div>
          </div>
          <div className="btn-submit">{t('确认申请')}</div>
        </div>
      </Popup>
    </>
  );
};
export default ConversionPopup;
