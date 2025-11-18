import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Popup, Input } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import popupHintIcon from "@/assets/popup/popupHintIcon.png";
import { t } from "i18next";
const RedemptionPopup: React.FC = ({ isShow, onClose }) => {
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
        <div className="my-popup-page">
          <div className="header-option">
            <div className="title">{t("质押")}</div>
            <div className="close-icon" onClick={() => onCloseChange()}>
              <CloseOutline fontSize={12} color="#969797" />
            </div>
          </div>

          <div className="input-box">
            <div className="input-hint-txt-option">
              <div className="txt-option">{t("质押TAX")}:</div>
              <div className="txt-option right-txt">{t("余额")}：2,805.78</div>
            </div>
            <div className={`input-option ${isFocus ? "input-focus" : ""}`}>
              <Input
                placeholder={t("请输入")}
                value={inputNumber}
                onChange={(val) => {
                  setInputNumber(val);
                }}
                onFocus={() => setIsFocus(true)} // ✅ 获得焦点
                onBlur={() => setIsFocus(false)} // ✅ 失去焦点
                clearable
                className="input-class"
              />
              <div className="input-txt">TAX</div>
            </div>
            <div className="input-hint-txt-option margin-12">
              <div className="txt-option">{t("预计日收益")}:</div>
              <div className="txt-option right-txt">0.55 TAX</div>
            </div>
          </div>
          <div className="btn-submit">{t("确认质押")}</div>
        </div>
      </Popup>
    </>
  );
};
export default RedemptionPopup;
