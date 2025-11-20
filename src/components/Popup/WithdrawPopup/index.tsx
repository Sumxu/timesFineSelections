import "./index.scss";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Popup, Input } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import popupHintIcon from "@/assets/popup/popupHintIcon.png";
import { t } from "i18next";
import ContractRequest from "@/Hooks/ContractRequest.ts";
import ContractList from "@/Contract/Contract";
import { fromWei, Totast, toWei } from "@/Hooks/Utils";
import { userAddress } from "@/Store/Store.ts";
import { BigNumber, utils } from "ethers";
import { Button } from "antd-mobile";
import ContractSend from "@/Hooks/ContractSend.ts";
const MyPopup: React.FC = ({ isShow, onClose }) => {
  const [userInfo, setUserInfo] = useState({}); //用户信息
  const walletAddress = userAddress((state) => state.address);
  const [rate, setRate] = useState<BigNumber>(BigNumber.from(0));
  const [inputNumber, setInputNumber] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [getTaxNumber, setGetTaxNumber] = useState<BigNumber>(
    BigNumber.from(0)
  );
  const [isFocus, setIsFocus] = useState(false); // ✅ 是否获得焦点
  const onCloseChange = () => {
    onClose();
  };
  //兑换比例
  const getTusdSwap = async () => {
    const paramsData = [
      toWei(1),
      [ContractList["USDTToken"].address, ContractList["TaxToken"].address],
    ];
    console.log("paramsData==", paramsData);
    const result = await ContractRequest({
      tokenName: "swapRouterToken",
      methodsName: "getAmountsOut",
      params: paramsData,
    });
    if (result.value) {
      const usdtIn = result.value[0]; // 1 USDT
      const taxOut = result.value[1]; // 能换多少 TAX
      // 计算兑换比例
      const rate = fromWei(taxOut); // 比例：1 USDT = rate TAX
      console.log("兑换比例: 1 USDT =", rate, "TAX");
      setRate(taxOut);
    }
  };

  const getUserInfo = async () => {
    const result = await ContractRequest({
      tokenName: "storeToken",
      methodsName: "userInfo",
      params: [walletAddress],
    });
    if (result.value) {
      setUserInfo(result.value);
    }
  };
  const inputChange = (val) => {
    // 1) 保存输入框内容
    setInputNumber(val);

    // 如果 val 为空，直接归零
    if (!val || Number(val) <= 0) {
      setGetTaxNumber("0");
      return;
    }
    try {
      // 2) 转换为 wei（USDT 输入值 → wei）
      const usdtWei = toWei(val); // BigNumber
      // 3) 计算 TAX（wei）
      // 公式：TAX = USDT × rate / 1e18
      const taxWei = BigNumber.from(usdtWei)
        .mul(rate) // USDT(wei) * RATE(wei) = 36 decimals
        .div(utils.parseUnits("1", 18)); // 除 1e18 还原成 18 decimals

      // 4) 保存结果（wei）
      setGetTaxNumber(taxWei);
    } catch (error) {
      console.error("转换错误:", error);
    }
  };
  //确认提现
  const submitClick = async () => {
    console.log(
      "BigNumber.from(inputNumber).lt(userInfo.tusd)",
      BigNumber.from(inputNumber).gt(userInfo.tusd)
    );
    if (BigNumber.from(inputNumber).gt(userInfo.tusd)) {
      return Totast(t("余额不足"), "info");
    }
    setSubmitLoading(true);
    const submitResult = await ContractSend({
      tokenName: "storeToken",
      methodsName: "withdraw",
      params: [toWei(inputNumber)],
    });
    setSubmitLoading(false);
    if (submitResult.value) {
      onClose();
    }
  };
  useEffect(() => {
    if (isShow == false) return;
    getTusdSwap(); //获取兑换比例
    getUserInfo(); //获取用户信息
  }, [isShow]);
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
            <div className="title">{t("提现")}</div>
            <div className="close-icon" onClick={() => onCloseChange()}>
              <CloseOutline fontSize={12} color="#969797" />
            </div>
          </div>
          <div className="tag-box">
            <img src={popupHintIcon} className="icon"></img>
            <div className="txt-option">
              {t("兑换比例")}：1.00 TUSD ≈ {fromWei(rate, 18, true, 2)}
            </div>
          </div>
          <div className="input-box">
            <div className="input-hint-txt-option">
              <div className="txt-option">{t("提现数量")}:</div>
              <div className="txt-option right-txt">
                {t("余额")}:{fromWei(userInfo.tusd)} TUSD
              </div>
            </div>
            <div className={`input-option ${isFocus ? "input-focus" : ""}`}>
              <Input
                placeholder={t("请输入内容")}
                value={inputNumber}
                onChange={(val) => {
                  inputChange(val);
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
              <div className="txt-option">{t("预计获得")}TAX:</div>
            </div>
            <div className="input-option input-no">
              <div className="input-number">{fromWei(getTaxNumber)}</div>
              <div className="input-txt">TAX</div>
            </div>
          </div>
          <Button
            loading={submitLoading}
            loadingText={t("确认中")}
            className="btn-withdraw-submit"
            onClick={() => {
              submitClick();
            }}
          >
            {t("确认提现")}
          </Button>
        </div>
      </Popup>
    </>
  );
};
export default MyPopup;
