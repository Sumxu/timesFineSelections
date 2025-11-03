import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Popup, Input } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import popupHintIcon from "@/assets/popup/popupHintIcon.png"

const MyPopup: React.FC = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [inputNumber, setInputNumber] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false); // ✅ 是否获得焦点
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
        <div className="my-popup-page">
          <div className="header-option">
            <div className="title">提现</div>
            <div className="close-icon" onClick={()=>onCloseChange()}>
              <CloseOutline fontSize={12} color="#969797" />
            </div>
          </div>
          <div className="tag-box">
            <img src={popupHintIcon} className="icon"></img>
            <div className="txt-option">兑换比例：1.00 TUSD ≈ 0.5</div>
          </div>
          <div className="input-box">
            <div className="input-hint-txt-option">
              <div className="txt-option">提现数量:</div>
              <div className="txt-option right-txt">余额:2,805.78 TUSD</div>
            </div>
            <div
              className="input-option"
              className={`input-option ${isFocus ? "input-focus" : ""}`}
            >
              <Input
                placeholder="请输入内容"
                value={inputNumber}
                onChange={(val) => {
                  setInputNumber(val);
                }}
                onFocus={() => setIsFocus(true)} // ✅ 获得焦点
                onBlur={() => setIsFocus(false)} // ✅ 失去焦点
                clearable
                className="input-class"
              />
              <div className="input-txt">TUSD</div>
            </div>
          </div>

          <div className="input-box">
            <div className="input-hint-txt-option">
              <div className="txt-option">将获得TAX:</div>
            </div>
            <div className="input-option input-no">
              <div className="input-number">0.00</div>
              <div className="input-txt">TAX</div>
            </div>
          </div>

          <div className="hint-txt-box">
            <div className="hint-txt-option">手续费(3.0%):</div>
            <div className="hint-txt-option right-bold">-0.00TAX</div>
          </div>
          <div className="hint-txt-box">
            <div className="hint-txt-option">实际到账:</div>
            <div className="hint-txt-option right-option">0.00 TAX</div>
          </div>
          <div className="btn-submit">确认提现</div>
        </div>
      </Popup>
    </>
  );
};
export default MyPopup;
